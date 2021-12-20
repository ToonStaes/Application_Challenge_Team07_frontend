import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from '../../category';
import { CategoryService } from '../../category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { removeSummaryDuplicates } from '@angular/compiler';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  productCategory: Product[] = [];
  products: Product[] = [];
  categories: Category[] = [];

  selectedCategory: string = '';
  productName: string = '';
  search: string = '';

  products$: Subscription = new Subscription();
  categories$: Subscription = new Subscription();
  postSearch$: Subscription = new Subscription();

  isSubmitted: boolean = false;
  showOutOfStock: boolean = false;
  isCategory1: boolean = false;

  errorMessage: string = '';

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  })

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.isCategory1 =
      this.router.getCurrentNavigation()?.extras.state?.mode == 'category1';
  }

  ngOnInit(): void {
    // On initialization call all products & categories
    this.getProducts();
    this.getCategories();
  }

  ngOnDestroy(): void {
    // on destroy unsubscribe from all subscriptions
    this.products$.unsubscribe();
    this.categories$.unsubscribe();
    this.postSearch$.unsubscribe();
  }

  //calls all products
  getProducts() {
    this.products$ = this.productService.getActiveProducts().subscribe((result) => {
      this.checkOutOfStock(result);
    });
  }

    //calls products based on their category id
    getProductsByCategory(categoryId: string) {
      this.products$ = this.productService
        .getProductsByCategoryId(categoryId)
        .subscribe((result) => {

          this.checkOutOfStock(result);
        });
    }

  //calls all categories for the dropdown list
  getCategories() {
    this.categories$ = this.categoryService
      .getCategories()
      .subscribe((result) => {
        this.categories = [];
        // forEach to filter out all the non active categories
        result.forEach(cat => {
          if (cat.isActive) {
            this.categories.push(cat);
          }
        });
      });
  }

  // checks if there is a category selected & calls the corresponding method to call the products
  onFilter() {
    if (this.selectedCategory != '') {
      this.getProductsByCategory(this.selectedCategory);
    } else {
      this.getProducts();
    }
  }

  //Toggles the showOutOfStock boolean & calls the onFilter method to recall the products
  toggleShowOutOfStock() {
    if (this.showOutOfStock) {
      this.showOutOfStock = false;
    } else {
      this.showOutOfStock = true;
    }
    this.onFilter();
  }

  // navigates to product detail page.
  toDetail(id: string) {
    this.router.navigateByUrl('/product/' + id);
  }

  //made to reduce duplicate code
  checkOutOfStock(result: Array<Product>){
    //checks & potentialy filters out products that don't have any stock
    if (this.showOutOfStock) {
      this.products = result;
    } else {
      // clearing the products array to prevent stacking while using the push method.
      this.products = [];
      result.forEach((item) => {
        if (item.stockCount > 0) {
          this.products.push(item);
        }
      });
    }
  }

  //filters products based on name
  filterProductsByName(search: string){
    this.products$ = this.productService.filterByProductName(search).subscribe((result => {
      this.checkOutOfStock(result);
    }));
  }

  //calls the filterProductsByName method when values aren't empty
  onSubmit(){
    if (this.searchForm.value != null && this.searchForm.value != ''){
      this.isSubmitted = true;
      this.filterProductsByName(this.searchForm.value);
    }
    else{
      this.getProducts();
    }

  }
}
