import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  selectedCategory: number = 0;
  isCategory1: boolean = false;
  productCategory: Product[] = [];
  products: Product[] = [];
  products$: Subscription = new Subscription();
  categories: Category[] = [];
  categories$: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.isCategory1 =
      this.router.getCurrentNavigation()?.extras.state?.mode == 'category1';
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.products$ = this.productService
      .getProducts()
      .subscribe((result) => {
        this.products = []
        result.forEach(item => {
          if (item.amountInStock > 0){
            this.products.push(item)
          }
        });
      });
  }

  getProductsInclWithoutStock() {
    this.products$ = this.productService
      .getProducts()
      .subscribe((result) => (this.products = result));
  }

  getCategories() {
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((result) => (this.categories = result));
  }

  getProductsByCategory(categoryId: number) {
    this.products$ = this.productService
      .getProductsByCategory(categoryId)
      .subscribe((result) => {
        this.products = []
        result.forEach(item => {
          if (item.amountInStock > 0){
            this.products.push(item)
          }
        });

      });
  }

  onFilter() {
    if (this.selectedCategory != 0) {
      this.getProductsByCategory(this.selectedCategory);
    } if (this.selectedCategory == -1) {
      this.getProductsInclWithoutStock();
    } else {
      this.getProducts();
    }
  }

  toDetail(id: number) {
    this.router.navigateByUrl("/product/" + id)
  }
}
