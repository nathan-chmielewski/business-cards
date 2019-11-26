import { Component, OnInit } from '@angular/core';
import { WebcamInitError } from '../modules/webcam/domain/webcam-init-error';
import { WebcamImage } from '../modules/webcam/domain/webcam-image';
import { Subject, Observable } from 'rxjs';
import { WebcamUtil } from '../modules/webcam/util/webcam.util';
import domtoimage from 'dom-to-image';
import { BusinessCardService } from '../business-card.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BusinessCard } from '../business-card/business-card.model';
import { isUndefined } from 'util';

@Component({
    selector: 'app-webcam',
    templateUrl: './webcam.component.html',
    styleUrls: ['./webcam.component.css']
})

export class WebcamComponent implements OnInit {
    // toggle webcam on/off
    public showWebcam = true;
    public errors: WebcamInitError[] = [];
    
    // latest snapshot
    public webcamImage: WebcamImage = null;
    public base64: string;
    
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    
    // results populate form
    businessCardForm: FormGroup;
    visionResults: string[];
    businessCard: BusinessCard;
    
    constructor (private businessCardService: BusinessCardService,
                 private http: HttpClient,
                 private fb: FormBuilder) {

    this.businessCardForm = fb.group ({
        'firstName': [''],
        'lastName': [''],
        'organization': [''],
        'email': [''],
        'phoneNumber': [''],
        'additionalInfo': [''],
        'imgUrl': ['']
    });
}

    public ngOnInit(): void {

    }

    public triggerSnapshot(): void {
        this.trigger.next();
    }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
        console.warn("Camera access was not allowed by user!");
        }

    this.errors.push(error);
    }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public convertToBase64() {

    const imgNode = document.getElementById(`image`);
    // const imgNode = this.webcamImage.imageAsDataUrl;
    console.log('SELECTED IMAGE');
    console.log(imgNode);
    console.log('SELECTED IMAGE');
    domtoimage.toPng(imgNode)
    .then( (dataUrl: string) => {
        console.log('SELECTED IMAGE 2');
        console.log(dataUrl);
        this.base64 = dataUrl;
        console.log('SELECTED IMAGE 2');
        // this.businessCardService.convertImageToBusinessCard(this.base64);
        this.convertImageToBusinessCard();
    }).catch( (e: any) => {
        console.log('SELECTED IMAGE BASE64 SOMETHING WENT WRONG');
        console.log(e);
    });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  convertImageToBusinessCard(): void {
    // Google Cloud requires that the header for a base64 image be removed
    const parsedImage = this.base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

    // const parsedImage = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    console.log('SELECTED IMAGE 3');
    console.log(parsedImage);
    console.log('SELECTED IMAGE 3');
    this.postRequest(parsedImage);
  }

  postRequest(parsedImage: string) {
    const request: any = {
        'requests': [
            {
                'image': {
                    'content': parsedImage// INSERT IMAGE HERE
                },
                'features': [
                    {
                        'type': 'TEXT_DETECTION',
                        'maxResults': 1,
                    }
                ]
            }
        ]
    };
    const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + environment.cloudVision;
    
    this.http.post(
        url,
        request
    ).subscribe( (results: any) => {
        console.log('RESULTS RESULTS RESULTS');
        console.log(results);
        this.visionResults = results;
        this.populateForm();
        console.log('RESULTS RESULTS RESULTS');
    });

  }

  populateForm(): void {

    let responses = this.visionResults["responses"];
    let arr = responses[0];
    let fullTextAnnotation = arr["fullTextAnnotation"];
    let textAnnotations = arr["textAnnotations"];

    let firstName;
    let lastName;
    let email;
    let phoneNumber;
    let additionalInfo = fullTextAnnotation["text"].replace("\\n", "\n");
    let organization;
    // let additionalInfo = fullTextAnnotation["text"];

    if ((typeof textAnnotations[1] === 'undefined')
         || textAnnotations[1] === null) {
        firstName = '';
    } else {
        firstName = textAnnotations[1].description;
        console.log('Extract firstName:', firstName);
    }

    if ((typeof textAnnotations[2] === 'undefined')
        || textAnnotations[2] === null) {
        lastName = '';
    } else {
        lastName = textAnnotations[2].description;
        console.log('Extract lastName:', lastName);
    }

    if ((typeof textAnnotations[3] === 'undefined')
    || textAnnotations[3] === null) {
        organization = '';
    } else {
        organization = textAnnotations[3].description;
        console.log('Extract organization:', organization);
    }

    if ((typeof this.extractEmail(fullTextAnnotation["text"]) === 'undefined')
         || this.extractEmail(fullTextAnnotation["text"]) === null) {
        email = '';
    } else {
        email = this.extractEmail(fullTextAnnotation["text"])[0];
        console.log('Extract email:', this.businessCard.email);
    }

    if ((typeof this.extractPhoneNumber(fullTextAnnotation["text"]) === 'undefined')
         || this.extractPhoneNumber(fullTextAnnotation["text"]) === null) {
             phoneNumber = '';
    } else {
        phoneNumber = this.extractPhoneNumber(fullTextAnnotation["text"])[0];
        console.log('Extract phone number:', this.businessCard.phoneNumber);
    }

    this.businessCardForm.get('firstName').setValue(firstName);
    this.businessCardForm.get('lastName').setValue(lastName);
    this.businessCardForm.get('organization').setValue(organization);
    this.businessCardForm.get('email').setValue(email);
    this.businessCardForm.get('phoneNumber').setValue(phoneNumber);
    this.businessCardForm.get('additionalInfo').setValue(additionalInfo);
    this.businessCardForm.get('imgUrl').setValue(this.webcamImage.imageAsDataUrl);

  }

  extractEmail(fullText: string) {
      return fullText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  }

  extractPhoneNumber(fullText: string) {
      return fullText.match(/(^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*)/);
  }


  onSubmit(businessCard: BusinessCard): void {
    console.log('Business card form submitted: ', businessCard);
    this.businessCardService.AddBusinessCard(businessCard);
    this.businessCardForm.reset();
}
}
