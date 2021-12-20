import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security/security.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/services/user.service';



@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    UserService
  ]
})
export class SecurityModule { }
