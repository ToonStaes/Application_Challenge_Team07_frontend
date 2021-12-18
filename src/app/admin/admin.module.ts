import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from './category/category.module';
import { ProductOverviewComponent } from './product-overview/product-overview.component';



@NgModule({
  declarations: [
    ProductOverviewComponent
  ],
  imports: [
    SharedModule,
    CategoryModule
  ],
  exports:[
    CategoryModule
  ]
})
export class AdminModule { }
