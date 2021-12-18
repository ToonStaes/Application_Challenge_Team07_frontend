import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductService } from './product.service';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductOverviewComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductOverviewComponent,
    ProductFormComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
