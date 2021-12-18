import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { SharedModule } from '../shared/shared.module';
import { BasketModule } from './basket/basket.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    SharedModule,
    BasketModule
  ],
  exports: [
    AccountModule,
    BasketModule
  ]
})
export class UserModule { }
