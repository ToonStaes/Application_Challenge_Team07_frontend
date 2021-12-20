import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './admin/category-detail/category-detail.component';
import { CategoryManagementComponent } from './admin/category-management/category-management.component';
import { BasketComponent } from './basket/basket.component';
import { AccountOverviewComponent } from './user/account/account-overview/account-overview.component';
import { HomeComponent } from './homepage/home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ApiTestsComponent } from './api-tests/api-tests.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SecurityComponent } from './security/security/security.component';
import { AuthGuard } from './security/auth.guard';
import { ProductOverviewComponent } from './admin/product-overview/product-overview.component';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';
import { AdminFormComponent } from './admin/admin-form/admin-form.component';
import { AddProductFormComponent } from './admin/add-product-form/add-product-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoryManagementComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  { path: 'category-detail', component: CategoryDetailComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'contact', component: ContactFormComponent },
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'account', component: AccountOverviewComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'payment-form', component: PaymentFormComponent },
  { path: 'login', component: SecurityComponent },
  { path: 'register', component: SecurityComponent },
  { path: 'logout', component: SecurityComponent },
  { path: 'apitests', component: ApiTestsComponent },
  { path: 'admin-management', component: AdminManagementComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'admin-form', component: AdminFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  { path: 'products', component: ProductOverviewComponent, canActivate: [AuthGuard]},
  { path: 'newProduct', component: AddProductFormComponent, canActivate: [AuthGuard]},
  { path: 'editProduct/:id', component: AddProductFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
