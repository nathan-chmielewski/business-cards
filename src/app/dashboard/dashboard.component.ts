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
  businessCardForm: FormGroup;

    constructor() {

   }

  ngOnInit() {
  }

}
