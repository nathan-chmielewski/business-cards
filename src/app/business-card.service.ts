import { Injectable } from '@angular/core';
import { BusinessCard } from './business-card/business-card.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  businessCards: BusinessCard[];

  constructor() { }

  createBusinessCard(value: string): void {
    console.log('Creating business card: ', value);
  }
}
