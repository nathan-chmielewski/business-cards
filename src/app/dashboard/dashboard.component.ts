import { Component, OnInit } from '@angular/core';
import { BusinessCard } from '../business-card/business-card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  businessCards: BusinessCard[];

  constructor() { }

  ngOnInit() {
  }

}
