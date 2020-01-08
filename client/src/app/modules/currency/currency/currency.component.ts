import { Component, OnInit } from '@angular/core';

import { CurrencyService } from '../currency.service';
import { ICurrency } from './models/icurrency';
import { Dollar } from './models/dollar';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  public currency: ICurrency = { USD: new Dollar() };
  public price: number = 0;
  public tax: number = 0;
  public americanPrice: number;
  public brazilianPrice: number;

  constructor(public dollarService: CurrencyService) { }

  ngOnInit() {
    this.getDollarPrice();
  }

  private getDollarPrice(): void {
    this.dollarService.getDollarPrice().subscribe(result => {
      this.currency = result;
      console.log(result.USD.create_date);
    });
  }

  public priceInput(value: number): void {
	  this.price = value;
  }

  public taxInput(value: number): void {
	  this.tax = value;
  }

  private getAmericanPrice() {
    if(this.price && this.tax != 0)
      return this.americanPrice = this.price * (this.tax/100 + 1);
    
    return this.americanPrice = 0;
  }
  
  private getBrazilianPrice() {
    if(this.price && this.tax != 0)
      return this.brazilianPrice = (this.price * this.currency.USD.high) * (this.tax/100 + 1);
    
    return this.brazilianPrice = 0;
  }
}
