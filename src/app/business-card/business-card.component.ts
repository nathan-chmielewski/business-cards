import { Component, OnInit, Input } from '@angular/core';
import { BusinessCard } from './business-card.model';
import { AngularFireObject } from '@angular/fire/database';
import { BusinessCardService } from '../business-card.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
    @Input() businessCard: BusinessCard;
    @Input() businessCardRef: AngularFireObject<any>;
    @Input() businessCardForm: FormGroup;
//   @Input() businessCardRef: Observable<any>;

  constructor(private businessCardService: BusinessCardService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.businessCardForm = this.fb.group ({
        'firstName': [this.businessCard.firstName],
        'lastName': [this.businessCard.lastName],
        'email': [this.businessCard.email],
        'phoneNumber': [this.businessCard.phoneNumber],
        'additionalInfo': [this.businessCard.additionalInfo]
      });
  }

  RemoveBusinessCard(): void {
    this.businessCardService.RemoveBusinessCard(this.businessCard);
  }

    UpdateBusinessCard(): void {
        console.log(this.businessCardForm);
        this.businessCardService.UpdateBusinessCard(this.businessCard.key, this.businessCardForm.value);
  }
}
