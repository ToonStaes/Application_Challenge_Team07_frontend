import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from '../../category';
import { CategoryService } from '../../category.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  showOutOfStock: boolean = false;

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
    this.products$ = this.productService.getProducts().subscribe((result) => {
      if (this.showOutOfStock) {
        this.products = result;
      } else {
        this.products = [];
        result.forEach((item) => {
          if (item.stockCount > 0) {
            this.products.push(item);
          }
        });
      }

      console.log(this.products);
    });
  }

  getCategories() {
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((result) => (this.categories = result));
  }

  getProductsByCategory(categoryId: number) {
    this.products$ = this.productService
      .getProductsByCategoryId(categoryId)
      .subscribe((result) => {
        if (this.showOutOfStock) {
          this.products = result;
        } else {
          this.products = [];
          result.forEach((item) => {
            if (item.stockCount > 0) {
              this.products.push(item);
            }
          });
        }
      });
  }

  onFilter() {
    if (this.selectedCategory != 0) {
      this.getProductsByCategory(this.selectedCategory);
    } else {
      this.getProducts();
    }
  }

  onShowOutOfStock() {
    if (this.showOutOfStock) {
      this.showOutOfStock = false;
    } else {
      this.showOutOfStock = true;
    }
    this.onFilter();
  }

  toDetail(id: string) {
    this.router.navigateByUrl('/product/' + id);
  }
}
