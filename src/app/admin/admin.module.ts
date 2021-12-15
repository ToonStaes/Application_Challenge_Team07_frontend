import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryManagementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
