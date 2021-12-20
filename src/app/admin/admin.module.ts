import { NgModule } from '@angular/core';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { SharedModule } from '../shared/shared.module';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryManagementComponent,
    ProductOverviewComponent,
    AdminManagementComponent,
    AdminFormComponent,
    AddProductFormComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
