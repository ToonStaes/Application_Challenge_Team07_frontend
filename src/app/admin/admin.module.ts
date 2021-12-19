import { NgModule } from '@angular/core';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { SharedModule } from '../shared/shared.module';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryManagementComponent,
    ProductOverviewComponent,
    AdminManagementComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
