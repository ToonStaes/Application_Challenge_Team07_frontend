import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    CardComponent,
    HomeComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    SharedModule
  ],
  exports: [
    CardComponent,
    HomeComponent,
    ProductDetailComponent
  ]
})
export class HomepageModule { }
