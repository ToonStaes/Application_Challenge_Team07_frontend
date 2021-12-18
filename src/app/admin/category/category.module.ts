import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryService } from './category.service';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CategoryDetailComponent,
    CategoryManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CategoryDetailComponent,
    CategoryManagementComponent

  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
