import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { BusinessCardService } from '../business-card.service';
import { Observable } from 'rxjs';
import { BusinessCard } from '../business-card/business-card.model';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {
  businessCardsRef: Observable<any[]>;
//   const businessCardsArray: Array<any[]>;
  businessCards: Array<BusinessCard>;


  constructor(private db: AngularFireDatabase,
              private businessCardService: BusinessCardService) {

  }

  ngOnInit() {
    
    this.businessCardsRef = this.businessCardService.businessCardsRef.valueChanges();
    this.businessCardsRef.subscribe(res => console.log(res));

    this.businessCardService.businessCardsRef.valueChanges()
    .subscribe(businessCards => this.businessCards = businessCards);
    // this.businessCards = this.businessCardService.businessCards;
  }

  // ngOnDestroy() {
  // }

}
