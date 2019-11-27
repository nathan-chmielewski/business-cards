import { Injectable } from '@angular/core';
import { BusinessCard } from './business-card/business-card.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  businessCardsRef: AngularFireList<any>;
  visionResults: any;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {

    this.businessCardsRef = this.db.list('/users/' + this.authService.userId + '/business-cards');
  }

  AddBusinessCard(businessCard: BusinessCard): void {
    console.log('Creating business card: ', businessCard);
    this.businessCardsRef.push( {
      firstName: businessCard.firstName,
      lastName: businessCard.lastName,
      organization: businessCard.organization,
      email: businessCard.email,
      phoneNumber: businessCard.phoneNumber,
      additionalInfo: businessCard.additionalInfo,
      imgUrl: businessCard.imgUrl
    })
    .then(ref => {
        this.db.object('/users/' + this.authService.userId + '/business-cards/' + ref.key)
        .update({key: ref.key });
    })
    .catch(error => {
      console.log(error);
    });
  }

  RemoveBusinessCard(businessCard: BusinessCard): void {
    console.log('Deleting business card: ', businessCard);
    this.db.object('/users/' + this.authService.userId + '/business-cards/' + businessCard.key).remove();
  }

  UpdateBusinessCard(businessCardRefKey: string, businessCard: BusinessCard): void {
    console.log('Updating business card: ', businessCard);
    this.db.list('/users/' + this.authService.userId + '/business-cards/')
    .update(businessCardRefKey, {
        firstName: businessCard.firstName,
        lastName: businessCard.lastName,
        organization: businessCard.organization,
        email: businessCard.email,
        phoneNumber: businessCard.phoneNumber,
        additionalInfo: businessCard.additionalInfo
    });
  }

}
