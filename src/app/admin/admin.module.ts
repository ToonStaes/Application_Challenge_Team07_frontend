import { NgModule } from '@angular/core';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryManagementComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
