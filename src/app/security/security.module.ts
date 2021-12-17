import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security/security.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SecurityModule { }
