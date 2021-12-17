import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { BasketComponent } from './basket/basket.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category-management', component: CategoryManagementComponent},
  {path: 'category-detail', component: CategoryDetailComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'account', component: AccountOverviewComponent},
  {path: 'payment-form', component: PaymentFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
