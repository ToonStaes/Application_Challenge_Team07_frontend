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

import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductDetailComponent } from './homepage/product-detail/product-detail.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ApiTestsComponent } from './api-tests/api-tests.component';
import { ContactFormComponent } from './homepage/contact-form/contact-form.component';
import { UserModule } from './user/user.module';
import { HomepageModule } from './homepage/homepage.module';

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    ApiTestsComponent
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
