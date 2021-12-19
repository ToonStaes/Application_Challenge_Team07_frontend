import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService, public productService: ProductService) { }

  ngOnInit(): void {
  }

  toAccount() {
    this.router.navigateByUrl("/account")
  }

  logout() {
    this.router.navigateByUrl('/logout');
  }
}
