import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { BasketComponent } from './user/basket/basket.component';
import { BasketItemComponent } from './user/basket/basket-item/basket-item.component';
import { PaymentFormComponent } from './user/basket/payment-form/payment-form.component';

import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ApiTestsComponent } from './api-tests/api-tests.component';
import { ContactFormComponent } from './homepage/contact-form/contact-form.component';
import { UserModule } from './user/user.module';
import { HomepageModule } from './homepage/homepage.module';
import { SecurityInterceptor } from './security/security.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ApiTestsComponent,
  ],
  imports: [
    SharedModule,
    AdminModule,
    SecurityModule,
    UserModule,
    HomepageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
