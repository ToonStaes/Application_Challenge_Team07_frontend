import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { BasketService } from './basket.service';
import { BasketItemService } from './basket-item.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentFormComponent } from './payment-form/payment-form.component';



@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BasketComponent,
    BasketItemComponent,
  ],
  providers: [
    BasketService,
    BasketItemService,
    PaymentFormComponent
  ]
})
export class BasketModule { }
