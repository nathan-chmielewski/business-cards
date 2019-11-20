import { Injectable } from '@angular/core';
import { BusinessCard } from './business-card/business-card.model';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  // businessCards: BusinessCard[];
  businessCardsRef: AngularFireList<any>;
//   businessCardRef: AngularFireObject<any>;
  // businessCards: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {

    // this.businessCardsRef = this.db.list('/business-cards');
    this.businessCardsRef = this.db.list('/users/' + this.authService.userId + '/business-cards');
    // this.businessCards = this.businessCardsRef.valueChanges();
    // this.businessCards.subscribe(res => console.log(res));
  }

  // getBusinessCards(): Observable<any[]> {
  //   return this.businessCards;
  // }

  AddBusinessCard(businessCard: BusinessCard): void {
    console.log('Creating business card: ', businessCard);
    this.businessCardsRef.push( {
      firstName: businessCard.firstName,
      lastName: businessCard.lastName,
      email: businessCard.email,
      phoneNumber: businessCard.phoneNumber,
      additionalInfo: businessCard.additionalInfo
    })
    .then(ref => {
        // console.log(ref.key);
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

  UpdateBusinessCard(businessCard: BusinessCard): void {
    console.log('Updating business card: ', businessCard);
    this.db.object('/users/' + this.authService.userId + '/business-cards/' + businessCard.key)
    .update(businessCard);
  }
}
