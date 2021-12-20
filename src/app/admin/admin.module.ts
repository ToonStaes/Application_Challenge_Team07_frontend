import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';



@NgModule({
  declarations: [

    AdminManagementComponent,
    AdminFormComponent,

  ],
  imports: [
    SharedModule,
    CategoryModule,
    ProductModule
  ]
})
export class AdminModule { }
