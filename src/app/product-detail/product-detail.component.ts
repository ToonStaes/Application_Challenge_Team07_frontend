import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketService } from '../basket.service';
import { BasketItem } from '../basketItem';
import { Category } from '../category';
import { Order } from '../order';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  category: Category = { _id: '', name: '', isActive: true };
  basket: Basket = {
    _id: '',
    userId: 0,
    isActive: true,
    user: {} as User,
    order: {} as Order,
    basketItems: [],
  };
  basketItem: BasketItem = {
    _id: '',
    basketId: ' ',
    productId: '',
    amount: 0,
    product: {} as Product,
    basket: {} as Basket,
  };

  date: Date = new Date();
  @Input() product: Product = {
    _id: '0',
    name: '',
    price: 0,
    description: '',
    isActive: true,
    stockCount: 0,
    rating: 5,
    imageLocation: 'string',
    expirationDate: 'date',
    color: 'string',
    size: 'string',
    amount: 0,
    categoryId: '61b6fd619d7d2a27b9880374',
    category: this.category,
  };

  userId = '61b70536efeb9804e3a76664';

  product$: Subscription = new Subscription();
  basket$: Subscription = new Subscription();
  postBasketItem$: Subscription = new Subscription();

  addProductToCartForm = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private basketItemService: BasketItemService
  ) {}
  debugMessage: string = '';
  errorMessage: string = '';
  addedToCartMessage: string = '';

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.product$ = this.productService
        .getProductById(productId)
        .subscribe((result) => {
          this.product = result;
        });
      this.basket$ = this.basketService
        .getBasketsByUserId(this.userId)
        .subscribe((result) => {
          result.forEach((list) => {
            if (list.orderId == null) {
              this.basket = list;
            }
          });
        });
      this.debugMessage += 'product get' + productId;
    }
  }

  ngOnDestroy(): void {
    this.product$.unsubscribe();
    this.basket$.unsubscribe();
    this.postBasketItem$.unsubscribe();
  }

  onSubmit(): void {
    if (this.addProductToCartForm.value.amount != 0) {
      this.basketItem.basketId = this.basket._id;
      this.basketItem.productId = this.product.id!;
      this.basketItem.amount = this.addProductToCartForm.value.amount;

      this.postBasketItem$ = this.basketItemService
        .addBasketItem(this.basketItem)
        .subscribe(
          (result) => {
            this.addedToCartMessage =
              this.product.name +
              ' is ' +
              Math.round(this.addProductToCartForm.value.amount) +
              ' keer toegevoegd aan uw winkelmandje.';
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}
