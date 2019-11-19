import { Component, OnInit, Input } from '@angular/core';
import { BusinessCard } from './business-card.model';
import { AngularFireObject } from '@angular/fire/database';
import { BusinessCardService } from '../business-card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() businessCard: BusinessCard;
  @Input() businessCardRef: AngularFireObject<any>;
//   @Input() businessCardRef: Observable<any>;

  constructor(private businessCardService: BusinessCardService) {
  }

  ngOnInit() {
  }

  RemoveBusinessCard(): void {
    this.businessCardService.RemoveBusinessCard(this.businessCard);
  }
}
