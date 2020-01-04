import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICurrency } from './currency/models/icurrency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  readonly ENTITY_URL: string = `https://economia.awesomeapi.com.br/all/`;

  constructor(public readonly http: HttpClient) { }

  public getDollarPrice(): Observable<ICurrency> {
    return this.http.get<ICurrency>(`${this.ENTITY_URL}USD-BRL`)
  }
}
