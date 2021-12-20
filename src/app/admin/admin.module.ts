import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { CategoryModule } from './category/category.module';



@NgModule({
  declarations: [
    ProductOverviewComponent,
    AdminManagementComponent,
    AdminFormComponent,
    AddProductFormComponent
  ],
  imports: [
    SharedModule,
    CategoryModule
  ]
})
export class AdminModule { }
