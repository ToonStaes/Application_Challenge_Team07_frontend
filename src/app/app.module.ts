import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HomeComponent } from './homepage/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketComponent } from './basket/basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
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
