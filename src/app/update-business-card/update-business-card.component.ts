import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusinessCardService } from '../business-card.service';
import { AngularFireObject } from '@angular/fire/database';
import { BusinessCard } from '../business-card/business-card.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

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

  constructor(private businessCardService: BusinessCardService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {

    const key = this.route.snapshot.paramMap.get('key');
    console.log('Update component key route param: ', key);
    // this.businessCardsRef = this.businessCardService.businessCardsRef.valueChanges();

    // this.businessCardService.businessCardsRef.valueChanges()
    // .subscribe(businessCards => this.businessCards = businessCards);
  }

  UpdateBusinessCard(): void {
    // console.log(this.businessCardForm);
    this.businessCardService.UpdateBusinessCard(this.businessCard.key, this.businessCardForm.value);
  }
}
