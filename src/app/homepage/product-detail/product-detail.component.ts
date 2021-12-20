import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../admin/category/category';

import { Order } from '../../shared/services/order';
import { Product } from '../../admin/product/product';

import { AuthService } from '../../security/auth.service';
import { ProductService } from 'src/app/admin/product/product.service';
import { Basket } from 'src/app/user/basket/basket';
import { BasketItem } from 'src/app/user/basket/basketItem';
import { BasketService } from 'src/app/user/basket/basket.service';
import { BasketItemService } from 'src/app/user/basket/basket-item.service';
import { User } from 'src/app/shared/services/user';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  // all objects
  category: Category = { _id: '', name: '', isActive: true };
  basket: Basket = {
    _id: '',
    userId: 0,
    isActive: true,
    user: {} as User,
    order: {} as Order
  };
  basketItem: BasketItem = {
    _id: '',
    basketId: ' ',
    productId: '',
    amount: 0,
    product: {} as Product,
    basket: {} as Basket,
  };
  product: Product = {
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
    amount: '0',
    categoryId: '61b6fd619d7d2a27b9880374',
    category: this.category,
  };
  user: User = {
    _id: '',
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@test.com',
    isAdmin: false,
    isSuperAdmin: false,
    token: '',
    password: '',
  };

  // subscriptions
  product$: Subscription = new Subscription();
  basket$: Subscription = new Subscription();
  postBasketItem$: Subscription = new Subscription();

  // to keep track of the amount in the reactive from
  addProductToCartForm = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
  });

   //various messages that may appear on the page.
   debugMessage: string = '';
   errorMessage: string = '';
   confirmMessage: string = '';
   addedToCartMessage: string = '';

   //booleans
   showConfirmButton: boolean = false;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private basketItemService: BasketItemService,
    private authService: AuthService
  ) {}



  ngOnInit(): void {
    // get user from authservice
    this.user = this.authService.getUser()!;
    // get product ID from route parameter
    const productId = this.route.snapshot.paramMap.get('id');

    // if productID isn't null, call the product
    if (productId != null) {
      this.product$ = this.productService
        .getProductById(productId)
        .subscribe((result) => {
          this.product = result;
        });
    }

    //if userID isn't null, call the user's active basket
    if (this.user) {
      if (this.user._id != '' || this.user._id != null) {
        this.basket$ = this.basketService
          .getBasketsByUserId(this.user._id)
          .subscribe((result) => {
            //find the active basket
            result.forEach((list) => {
              if (list.orderId == null) {
                this.basket = list;
              }
            });
          });
      }
    }

    // make sure this bool is false
    this.showConfirmButton = false;
  }

  // unsubscribes from all subscriptions on destroy
  ngOnDestroy(): void {
    this.product$.unsubscribe();
    this.basket$.unsubscribe();
    this.postBasketItem$.unsubscribe();
  }

  //when the submit button is pressed
  onSubmit(): void {
    //when the first button is pressed, show a confirm message & turn the bool to true. the bool will display a different confirm button to finish adding the item.
    if (!this.showConfirmButton) {
      this.showConfirmButton = true;
      this.confirmMessage = "Are you sure you want to add " + this.product.name + " " + Math.round(this.addProductToCartForm.value.amount) + " time(s) to your basket?";
    }
    // confirm button was pressed now it is added to the basket by makeing a new basketItem
    else{
      if (this.addProductToCartForm.value.amount != 0) {
        // Make the basketItem object
        this.makeBasketItem(this.basket._id, this.product._id!, this.addProductToCartForm.value.amount)

        // post the new basketItem
        this.saveBasketItem(this.basketItem)
    }
    }

  }

  makeBasketItem(basketId: string, productId: string, amount: number){
    this.basketItem.basketId = basketId;
      this.basketItem.productId = productId;
      this.basketItem.amount = amount;
  }


  saveBasketItem(basketItem: BasketItem){
    this.postBasketItem$ = this.basketItemService
        .addBasketItem(basketItem)
        .subscribe(
          (result) => {
            // show a success message, remove the confirmation text & turn the bool to false
            this.addedToCartMessage =
              this.product.name +
              ' has been ' +
              Math.round(this.addProductToCartForm.value.amount) +
              ' time(s) added to your basket.';
              this.showConfirmButton = false;
              this.confirmMessage = "";
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
  }
}
