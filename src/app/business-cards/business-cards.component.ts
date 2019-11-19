import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { BusinessCardService } from '../business-card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {
  businessCards: Observable<any[]>;


  constructor(private db: AngularFireDatabase,
              private businessCardService: BusinessCardService) {

  }

  ngOnInit() {
    this.businessCards = this.businessCardService.businessCards;
  }

}
