import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Basket } from '../../../basket';
import { BasketItemService } from '../../../basket-item.service';
import { BasketItem } from '../../../basketItem';
import { Order } from '../../../order';
import { User } from '../../../user';

@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.scss'],
})
export class AccountOrderComponent implements OnInit {
  @Input() basket: Basket = {
    _id: '',
    userId: 0,
    orderId: 0,
    isActive: true,
    user: {} as User,
    order: {} as Order
  };

  debugMessage: string = "test ";

  totalProducts = 0;
  totalCost = 0;
  basketItems: BasketItem[] = [];

  basketItems$: Subscription = new Subscription();

  constructor(private basketItemService: BasketItemService) {}

  ngOnInit(): void {
    this.basketItems$ = this.basketItemService
      .getBasketItemsByBasketId(this.basket._id)
      .subscribe((result) => {
        this.basket.order.date = this.basket.order.date.slice(0, -14)
        this.debugMessage += result.length;
        this.basketItems = result;


        this.basketItems.forEach(item => {
          this.totalProducts += item.amount;
          this.totalCost += item.amount * item.product.price;
        });


      });
  }
}
