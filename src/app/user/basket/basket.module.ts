import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasketService } from './basket.service';
import { BasketItemModule } from './basket-item/basket-item.module';
import { BasketComponent } from './basket.component';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BasketItemModule
  ],
  exports: [
    BasketItemModule,
    BasketComponent
  ],
  providers: [
    BasketService
  ]
})
export class BasketModule { }
