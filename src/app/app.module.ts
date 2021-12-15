import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketComponent } from './basket/basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { CardComponent } from './card/card.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountOrderComponent } from './account-order/account-order.component';
import { ProductFormComponent } from './product-form/product-form.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BasketComponent,
    BasketItemComponent,
    ProductDetailComponent,
    AccountOverviewComponent,
    CardComponent,
    PaymentFormComponent,
    CategoryManagementComponent,
    CategoryDetailComponent,
    AccountFormComponent,
    AccountOrderComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
