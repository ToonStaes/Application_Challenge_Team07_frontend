import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { SharedModule } from '../shared/shared.module';
import { BasketModule } from './basket/basket.module';
import { UserService } from './user.service';
import { OrderService } from './order.service';



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
  ],
  providers: [
    UserService,
    OrderService
  ]
})
export class UserModule { }
