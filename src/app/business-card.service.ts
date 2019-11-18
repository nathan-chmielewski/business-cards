import { Injectable } from '@angular/core';
import { BusinessCard } from './business-card/business-card.model';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  // businessCards: BusinessCard[];
  businessCardsRef: AngularFireList<any>;
  businessCardRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.businessCardsRef = this.db.list('/business-cards');
  }

  AddBusinessCard(businessCard: BusinessCard): void {
    console.log('Creating business card: ', businessCard);
    this.businessCardsRef.push( {
      firstName: businessCard.firstName,
      lastName: businessCard.lastName,
      email: businessCard.email,
      phoneNumber: businessCard.phoneNumber,
      additionalInfo: businessCard.additionalInfo
    })
    .catch(error => {
      console.log(error);
    });
  }
}
