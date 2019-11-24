import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BusinessCardService } from '../business-card.service';
import { Observable } from 'rxjs';
import { BusinessCard } from '../business-card/business-card.model';

@Component({
  selector: 'app-search-business-cards',
  templateUrl: './search-business-cards.component.html',
  styleUrls: ['./search-business-cards.component.css']
})
export class SearchBusinessCardsComponent implements OnInit {
    businessCardsRef: Observable<any[]>;
    businessCards: Array<BusinessCard>;
    searchResults: AngularFireList<any[]>;
    term: string;

  constructor(private businessCardService: BusinessCardService) {
    }

    ngOnInit() {
        this.businessCardsRef = this.businessCardService.businessCardsRef.valueChanges();
        // this.businessCardsRef.subscribe(res => console.log(res));

        // this.businessCardService.businessCardsRef.valueChanges()
        // .subscribe(businessCards => this.businessCards = businessCards);
        // this.businessCards = this.businessCardService.businessCards;
    }

    queryList(): void {
        console.log('Searching term: ', this.term);
        // this.searchResults = this.businessCardService.SearchBusinessCard(this.term);
    }

}
