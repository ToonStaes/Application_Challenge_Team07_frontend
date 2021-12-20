import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Basket } from '../../../basket';
import { BasketItemService } from '../../../basket-item.service';
import { BasketItem } from '../../../basketItem';
import { Order } from '../../../order';
import { User } from '../../../user';
import * as moment from 'moment';

@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.scss'],
})
export class AccountOrderComponent implements OnInit {
  // basket object
  @Input() basket: Basket = {
    _id: '',
    userId: 0,
    orderId: 0,
    isActive: true,
    user: {} as User,
    order: {} as Order,
  };
  //basketItem array
  basketItems: BasketItem[] = [];

  // message that could show on page
  debugMessage: string = 'test ';

  // total variables
  totalProducts = 0;
  totalCost = 0;

  //subscription
  basketItems$: Subscription = new Subscription();

  constructor(private basketItemService: BasketItemService) {}

  ngOnInit(): void {
    // get all basket items by basket ID
    this.basketItems$ = this.basketItemService
      .getBasketItemsByBasketId(this.basket._id)
      .subscribe((result) => {
        this.basket.order.date = moment(this.basket.order.date).format("DD/MM/YYYY").toString();
        // this.basket.order.date = this.basket.order.date.slice(0, -14); // remove the last part of the date variable
        this.basketItems = result;

        this.basketItems.forEach((item) => {
          // count the total cost & total amount of products in the order
          this.totalProducts += item.amount;
          this.totalCost += item.amount * item.product.price;
        });
      });
  }

  // unsubscribe from all subscriptions on destroy
  ngOnDestroy(): void {
    this.basketItems$.unsubscribe();
  }
}
