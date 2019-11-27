import { Component, OnInit, Input } from '@angular/core';
import { BusinessCard } from './business-card.model';
import { AngularFireObject } from '@angular/fire/database';
import { BusinessCardService } from '../business-card.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-business-card',
    templateUrl: './business-card.component.html',
    styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
    @Input() businessCard: BusinessCard;
    @Input() businessCardRef: AngularFireObject<any>;
    @Input() businessCardForm: FormGroup;
    toggleUpdate: boolean = false;

    constructor(private businessCardService: BusinessCardService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
    }

    OnChanges() {
        this.businessCardForm = this.fb.group ({
            'firstName': [this.businessCard.firstName],
            'lastName': [this.businessCard.lastName],
            'organization': [this.businessCard.organization],
            'email': [this.businessCard.email],
            'phoneNumber': [this.businessCard.phoneNumber],
            'additionalInfo': [this.businessCard.additionalInfo]
        });
    }

    RemoveBusinessCard(): void {
        this.businessCardForm = this.fb.group ({
            'firstName': [''],
            'lastName': [''],
            'organization': [''],
            'email': [''],
            'phoneNumber': [''],
            'additionalInfo': [''],
            'imgUrl': ['']
        });
        this.businessCardService.RemoveBusinessCard(this.businessCard);
    }

    UpdateBusinessCard(): void {
        // console.log(this.businessCardForm);
        this.businessCardForm['imgUrl'] = this.businessCard.imgUrl;
        this.businessCardService.UpdateBusinessCard(this.businessCard.key, this.businessCardForm.value);
    }

  toggleUpdateForm() {
      this.toggleUpdate = !this.toggleUpdate;
  }
}
