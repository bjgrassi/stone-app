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
  public currency: ICurrency = {USD: new Dollar()};

  constructor(public dollarService: CurrencyService) { }

  ngOnInit() {
    this.getDollarPrice();
  }

  private getDollarPrice() {
    this.dollarService.getDollarPrice().subscribe(result => {
      this.currency = result;
    });
  }
}
