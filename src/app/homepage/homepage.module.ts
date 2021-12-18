import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    SharedModule
  ],
  exports: [
    CardComponent,
    HomeComponent
  ]
})
export class HomepageModule { }
