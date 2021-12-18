import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountOrderComponent } from './account-order/account-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user.module';



@NgModule({
  declarations: [
    AccountOverviewComponent,
    AccountFormComponent,
    AccountOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AccountOverviewComponent,
    AccountFormComponent,
    AccountOrderComponent
  ]
})
export class AccountModule { }
