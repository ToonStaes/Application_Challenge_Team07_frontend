import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    SharedModule
  ],
  exports: [
    AccountModule
  ]
})
export class UserModule { }
