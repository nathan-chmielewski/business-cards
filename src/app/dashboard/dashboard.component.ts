import { Component, OnInit } from '@angular/core';
import { BusinessCard } from '../business-card/business-card.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BusinessCardService } from '../business-card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  businessCards: BusinessCard[];
  businessCardForm: FormGroup;

  constructor(fb: FormBuilder,
              private businessCardService: BusinessCardService) {
    this.businessCardForm = fb.group ({
      'firstName': [''],
      'lastName': [''],
      'email': [''],
      'phoneNumber': [''],
      'additionalInfo': ['']
    });
   }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log('Business card form submitted: ', value);
    this.businessCardService.createBusinessCard(value);
  }

}
