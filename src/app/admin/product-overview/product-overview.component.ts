import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { AuthService } from 'src/app/security/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  // list of product-objects
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // check if logged in & retrieve userid if true, if not return to login
    if (this.authService.isLoggedIn()) {
      var userId = localStorage.getItem('id');
      if (userId != null && userId != ''){
        this.userService.getUserById(userId!).subscribe(user => {
          if (!user.isAdmin){
            this.router.navigateByUrl('/')
          }
        })
      }
      else {
        this.router.navigateByUrl('/');
      }
    }

    // get products for list
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
    });
  }

  // navigates to form in add mode
  addProduct() {
    this.router.navigateByUrl('newProduct');
  }

  // navigates to form in edit mode
  edit(product: Product) {
    this.router.navigateByUrl('editProduct/' + product._id);
  }

  // toggle if a product is active by clicking it's active symbol in the list
  toggleActive(product: Product) {
    product.isActive = !product.isActive;

    this.productService
      .putProduct(product._id!, product)
      .subscribe((result) => {
        product = result;
        this.products.forEach((item) => {
          if (item._id! === product._id!) {
            item = product;
          }
        });
      });
  }


}
