import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketService } from '../basket.service';
import { BasketItem } from '../basketItem';
import { Category } from '../category';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  category: Category = {id: 0, name: "test category"};
  basket: Basket = {id:0, userId:0};
  basketItem: BasketItem = {id:0, basketId:0, productId:'', amount:0};
  @Input() product: Product = {
    _id: '0',
    name: "Test Product",
    price: 0.00,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    // isActive: true,
    stockCount: 0,
    rating: 5,
    categoryId: 1,
    // category: this.category
  };

  userId= 1;

  product$: Subscription = new Subscription();
  basket$: Subscription = new Subscription();
  postBasketItem$: Subscription = new Subscription();

  addProductToCartForm = new FormGroup({
    amount: new FormControl(0, [Validators.required])
  });

  constructor(private productService: ProductService, private route: ActivatedRoute, private basketService: BasketService, private basketItemService: BasketItemService) { }
  debugMessage: string = '';
  errorMessage: string = "";
  addedToCartMessage: string = '';

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.product$ = this.productService.getProductById(productId).subscribe(result => this.product = result);
      this.basket$ = this.basketService.getBasketsByUserId(+this.userId).subscribe(result => {
        result.forEach(list => {
          if (list.orderId == null) {
            this.basket = list;
          }
        });
      });
      this.debugMessage += "product get" + productId
    }

  }

  ngOnDestroy(): void {
    this.product$.unsubscribe();
    this.basket$.unsubscribe();
    this.postBasketItem$.unsubscribe();
  }

  onSubmit(): void {


    if (this.addProductToCartForm.value.amount != 0) {
      this.basketItem.basketId = this.basket.id;
      this.basketItem.productId = this.product._id;
      this.basketItem.amount = this.addProductToCartForm.value.amount;


      this.postBasketItem$ = this.basketItemService.addBasketItem(this.basketItem).subscribe(result => {
        this.addedToCartMessage =  this.product.name + " is " +  Math.round(this.addProductToCartForm.value.amount) + " keer toegevoegd aan uw winkelmandje.";
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }


}
