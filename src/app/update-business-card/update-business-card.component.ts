import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusinessCardService } from '../business-card.service';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { BusinessCard } from '../business-card/business-card.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-update-business-card',
  templateUrl: './update-business-card.component.html',
  styleUrls: ['./update-business-card.component.css']
})
export class UpdateBusinessCardComponent implements OnInit {
    businessCard: BusinessCard;
    businessCardRef: AngularFireObject<any>;
    businessCardForm: FormGroup;
    businessCardsRef: Observable<any[]>;
    businessCards: Array<BusinessCard>;
    searchResults: AngularFireList<any[]>;


  constructor(private businessCardService: BusinessCardService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    console.log('Update component key route param: ', key);

    this.businessCardsRef = this.db.list('/users/' + this.authService.userId + '/business-cards',
    ref => ref.orderByChild('key').equalTo(key)).valueChanges();

    this.businessCardForm = this.fb.group ({
        'firstName': [''],
        'lastName': [''],
        'organization': [''],
        'email': [''],
        'phoneNumber': [''],
        'additionalInfo': ['']
    });

    this.businessCardsRef.subscribe(val => {
        this.businessCards = val;
        this.businessCard = this.businessCards[0];
        console.log(this.businessCard);
        this.businessCardForm = this.fb.group ({
            'firstName': [this.businessCard.firstName],
            'lastName': [this.businessCard.lastName],
            'organization': [this.businessCard.organization],
            'email': [this.businessCard.email],
            'phoneNumber': [this.businessCard.phoneNumber],
            'additionalInfo': [this.businessCard.additionalInfo]
        });
    });
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

  UpdateBusinessCard(): void {
    // console.log(this.businessCardForm);
    this.businessCardService.UpdateBusinessCard(this.businessCard.key, this.businessCardForm.value);
    this.router.navigate(['/app-dashboard']);  
  }
}
