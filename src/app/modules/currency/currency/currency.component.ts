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
  public americanPriceTax: number;
  public brazilianPriceTax: number;
  public iofs: IOF[] = [
    { type: 'Dinheiro', value: '1,1' },
    { type: 'Cartão', value: '6,4' }
  ]
  public iofModel: string;

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
    this.price = parseInt(value.toString().replace(".", "").replace(",", "."));
  }

  public taxInput(value: number): void {
	  this.tax = value;
  }

  public americanValueWIthTax() {
    if(this.price && this.tax != 0)
      return this.americanPriceTax = this.price * (this.tax/100 + 1);
    
    return this.americanPriceTax = 0;
  }
  
  public currencyDecimals() {
    var currencyStr: string = parseFloat(this.currency.USD.high.toString()).toFixed(2);
    var currencyNum:number = parseFloat(currencyStr);
    return currencyNum;
  }

  public brazilianValueWithTax() {
    if(this.price && this.tax != 0)
      return this.brazilianPriceTax = (this.price * this.currencyDecimals()) * (this.tax/100 + 1);
    
    return this.brazilianPriceTax = 0;
  }

  public americanValueWithIOF() {
    let iofValue = this.iofModel && parseFloat(this.iofModel.replace(",", "."));

    return this.americanValueWIthTax() * iofValue;
  }
  
  public brazilianValueWithIOF() {
    let iofValue = this.iofModel && parseFloat(this.iofModel.replace(",", "."));

    return this.brazilianValueWithTax() * iofValue;
  }
}
