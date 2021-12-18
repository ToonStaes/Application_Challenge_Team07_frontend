import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasketItemComponent } from './basket-item.component';
import { BasketItemService } from './basket-item.service';



@NgModule({
  declarations: [
    BasketItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BasketItemComponent
  ],
  providers: [
    BasketItemService
  ]
})
export class BasketItemModule { }
