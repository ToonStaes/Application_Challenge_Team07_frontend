import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { ProductService } from './product.service';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    ProductOverviewComponent,
    AddProductFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductOverviewComponent,
    AddProductFormComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
