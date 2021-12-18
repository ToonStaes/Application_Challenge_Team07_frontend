import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';



@NgModule({
  declarations: [

  ],
  imports: [
    SharedModule,
    CategoryModule,
    ProductModule
  ],
  exports:[
    CategoryModule,
    ProductModule
  ]
})
export class AdminModule { }
