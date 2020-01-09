import { Component, OnInit } from '@angular/core';

import { CurrencyService } from '../currency.service';
import { ICurrency } from './models/icurrency';
import { Dollar } from './models/dollar';
import { IOF } from './models/iiof';

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
  public iofs: IOF[] = [
    { type: 'Dinheiro', value: '1.1' },
    { type: 'Cartão', value: '6.4' }
]
  public selected = false;
  public americanTotal: number;
  public brazilianTotal: number;

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

  public getAmericanPrice() {
    if(this.price && this.tax != 0)
      return this.americanPrice = this.price * (this.tax/100 + 1);
    
    return this.americanPrice = 0;
  }
  
  public getBrazilianPrice() {
    if(this.price && this.tax != 0)
      return this.brazilianPrice = (this.price * this.currency.USD.high) * (this.tax/100 + 1);
    
    return this.brazilianPrice = 0;
  }

  //[(Valor do produto em dólar ou real) + (imposto do estado aonde esta comprando)] x (valor do dólar + IOF da compra de dólar)
  public selectOption(event: any) {
    this.selected = true;
    var iof: number = event.target.value;

    this.americanTotal = this.getAmericanPrice() + (this.getAmericanPrice() * (iof/100 + 1))
    this.brazilianTotal = this.getBrazilianPrice() + (this.getBrazilianPrice() * (iof/100 + 1))
  }
}
