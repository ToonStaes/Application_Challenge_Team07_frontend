import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './homepage/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketComponent } from './basket/basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AccountOverviewComponent } from './user/account/account-overview/account-overview.component';
import { CardComponent } from './homepage/card/card.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { AccountFormComponent } from './user/account/account-form/account-form.component';
import { AccountOrderComponent } from './user/account/account-order/account-order.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ApiTestsComponent } from './api-tests/api-tests.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { UserModule } from './user/user.module';
import { HomepageModule } from './homepage/homepage.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BasketComponent,
    BasketItemComponent,
    ProductDetailComponent,
    PaymentFormComponent,
    ProductFormComponent,
    ApiTestsComponent,
    ContactFormComponent,


  ],
  imports: [
    SharedModule,
    AdminModule,
    SecurityModule,
    UserModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
