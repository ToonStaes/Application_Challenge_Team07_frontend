import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../admin/product/product.service';

import { AuthService } from '../../security/auth.service';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user?: User

  constructor(private router: Router, public authService: AuthService, public productService: ProductService, public userService: UserService) { }

  ngOnInit(): void {
    // get logged in user id from localstorage
    var userId = localStorage.getItem('id');
    //get user by id
    if (userId != null && userId != ''){
      this.userService.getUserById(userId).subscribe(userFromDB => {
        this.user = userFromDB;
      })
    }
  }

  // Navigation methods

  toAccount() {
    this.router.navigateByUrl("/account")
  }

  toCategories() {
    this.router.navigateByUrl("/categories")
  }

  toProducts() {
    this.router.navigateByUrl("/products")
  }

  toAdmins(){
    this.router.navigateByUrl('/admins')
  }

  logout() {
    this.router.navigateByUrl('/logout');
  }
}
