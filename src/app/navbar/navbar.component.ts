import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AuthService } from '../security/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user?: User

  constructor(private router: Router, public authService: AuthService, public productService: ProductService, public userService: UserService) { }

  ngOnInit(): void {
    var userId = localStorage.getItem('id');
    if (userId != null && userId != ''){
      this.userService.getUserById(userId).subscribe(userFromDB => {
        this.user = userFromDB;
      })
    }
  }

  toAccount() {
    this.router.navigateByUrl("/account")
  }

  toCategories() {
    this.router.navigateByUrl("/categories")
  }

  toProducts() {
    this.router.navigateByUrl("/products")
  }

  logout() {
    this.router.navigateByUrl('/logout');
  }
}
