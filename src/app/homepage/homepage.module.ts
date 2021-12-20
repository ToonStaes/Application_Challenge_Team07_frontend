import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactFormComponent } from './contact-form/contact-form.component';



@NgModule({
  declarations: [
    CardComponent,
    HomeComponent,
    ProductDetailComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    SharedModule
  ],
  exports: [
    CardComponent,
    HomeComponent,
    ProductDetailComponent,
    ContactFormComponent
  ]
})
export class HomepageModule { }
