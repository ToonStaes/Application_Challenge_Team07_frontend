import { NgModule } from '@angular/core';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { SharedModule } from '../shared/shared.module';
import { ProductOverviewComponent } from './product-overview/product-overview.component';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryManagementComponent,
    ProductOverviewComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
