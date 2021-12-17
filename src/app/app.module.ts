import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketComponent } from './basket/basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { CardComponent } from './card/card.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { CategoryManagementComponent } from './admin/category-management/category-management.component';
import { CategoryDetailComponent } from './admin/category-detail/category-detail.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountOrderComponent } from './account-order/account-order.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { SecurityModule } from './security/security.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

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
    AccountFormComponent,
    AccountOrderComponent,
    ProductFormComponent,
  ],
  imports: [SharedModule, AdminModule, SecurityModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
