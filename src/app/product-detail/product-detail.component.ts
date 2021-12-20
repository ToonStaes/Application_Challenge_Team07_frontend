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

  // subscriptions
  product$: Subscription = new Subscription();
  basket$: Subscription = new Subscription();
  postBasketItem$: Subscription = new Subscription();

  // to keep track of the amount in the reactive from
  addProductToCartForm = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private basketItemService: BasketItemService
  ) {}

  //various messages that may appear on the page.
  debugMessage: string = '';
  errorMessage: string = '';
  confirmMessage: string = '';
  addedToCartMessage: string = '';

  //booleans
  showConfirmButton: boolean = false;

  //seperate id's
  userId = '61b70536efeb9804e3a76664';

  ngOnInit(): void {
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
    if (this.userId != null) {
      this.basket$ = this.basketService
        .getBasketsByUserId(this.userId)
        .subscribe((result) => {
          //find the active basket
          result.forEach((list) => {
            if (list.orderId == null) {
              this.basket = list;
            }
          });
        });
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
        this.basketItem.basketId = this.basket._id;
        this.basketItem.productId = this.product._id!;
        this.basketItem.amount = this.addProductToCartForm.value.amount;
        console.log(this.basketItem)

        // post the new basketItem
      this.postBasketItem$ = this.basketItemService
        .addBasketItem(this.basketItem)
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

  }
}
