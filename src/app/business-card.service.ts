import { Injectable } from '@angular/core';
import { BusinessCard } from './business-card/business-card.model';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { WebcamImage } from './modules/webcam/domain/webcam-image';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  // businessCards: BusinessCard[];
  businessCardsRef: AngularFireList<any>;
//   businessCardRef: AngularFireObject<any>;
  // businessCards: Observable<any[]>;
  visionResults: any;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private http: HttpClient) {

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
        // console.log(ref.key);
        this.db.object('/users/' + this.authService.userId + '/business-cards/' + ref.key)
        .update({key: ref.key });
    })
    .catch(error => {
      console.log(error);
    });
  }

//   GetBusinessCard(key: string): AngularFireList<any[]> {
//     return this.db.list('/users/' + this.authService.userId + '/business-cards',
//     ref => ref.orderByChild('key').equalTo('key'));
//   }

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

//   SearchBusinessCard(searchTerm: string): AngularFireList<any[]> {
//     return this.db.list('/users/' + this.authService.userId + '/business-cards',
//                  ref => ref.orderByChild('firstName').equalTo('searchTerm'));
//   }
}
