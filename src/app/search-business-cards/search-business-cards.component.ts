import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BusinessCard } from '../business-card/business-card.model';
import { AuthService } from '../auth/auth.service';

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
    searchType: any = 1;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    }

    ngOnInit() {
    }

    queryList(): void {
        console.log('Searching term: ', this.term);
        if(this.searchType === 1) {
            console.log('Search type: first name');
            this.businessCardsRef = this.db.list('/users/' + this.authService.userId + '/business-cards',
            ref => ref.orderByChild('firstName').equalTo(this.term)).valueChanges();
        }
        else if(this.searchType === 2) {
            console.log('Search type: last name');
            this.businessCardsRef = this.db.list('/users/' + this.authService.userId + '/business-cards',
            ref => ref.orderByChild('lastName').equalTo(this.term)).valueChanges();
        }
        else if(this.searchType === 3) {
            console.log('Search type: organization');
            this.businessCardsRef = this.db.list('/users/' + this.authService.userId + '/business-cards',
            ref => ref.orderByChild('organization').equalTo(this.term)).valueChanges();
        }

    }

}
