import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketItem } from '../basketItem';

@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.scss']
})
export class AccountOrderComponent implements OnInit {

  @Input() basket: Basket = { id: 0, userId: 0,orderId: 0,orders: [], basketItems: []};
  totalProducts = 0;
  totalCost = 0;
  basketItems: BasketItem[] = [];

  basketItems$: Subscription = new Subscription();

  constructor(private basketItemService: BasketItemService) { }

  ngOnInit(): void {
    this.basket.basketItems.forEach(item => {
      this.totalProducts += item.amount;
    });

    this.basketItems$ = this.basketItemService.getBasketItemsByBasketIdWithProduct(+this.basket.id).subscribe(result => {
      this.basketItems = result

      result.forEach(item => {

          this.totalCost += item.amount * item.product.price;

      });
    });
  }

}
