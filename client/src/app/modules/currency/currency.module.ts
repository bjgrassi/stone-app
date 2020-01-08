import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { CurrencyComponent } from './currency/currency.component';
import { CoreModule } from '../core/core.module';
import { CurrencyRoutes } from './currency.routes';
import { NgxMaskModule } from 'ngx-mask'


@NgModule({
  declarations: [
    CurrencyComponent
  ],
  exports: [
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    CurrencyRoutes,
    NgxMaskModule.forRoot()
  ]
})
export class CurrencyModule { }
