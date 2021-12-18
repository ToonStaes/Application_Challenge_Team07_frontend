import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketService } from '../basket.service';
import { BasketItem } from '../basketItem';
import { ItemTotal } from '../itemTotal';
import { Order } from '../order';
import { Product } from '../product';
import { ProductInBasketService } from '../product-in-basket.service';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket?: Basket;
  basketItems: BasketItem[] = [];
  products: Product[] = [];
  total: number = 0;
  totalRounded: number = 0;
  itemTotals: ItemTotal[] = [];
  orders: Order[] = [];
  orders$: Subscription = new Subscription();

  constructor(
    private basketService: BasketService,
    private basketItemService: BasketItemService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basketService
      .getBasketsByUserId('61b70536efeb9804e3a76664')
      .subscribe((result) => {
        result.forEach((dbBasket) => {
          if (dbBasket.orderId == null) {
            console.log('basket found');
            console.log(dbBasket._id);
            this.basket = dbBasket;
            this.basketItems = [];
            this.basketItemService
              .getBasketItemsByBasketId(this.basket._id)
              .subscribe((dbBasketItems) => {
                console.log('basketItems found');
                console.log(dbBasketItems);
                this.basketItems = dbBasketItems;
                this.basketItems.forEach((item) => {
                  console.log(item.id);
                });
              });
          }
        });
      });
  }

  updateTotal(itemTotal: ItemTotal) {
    let inserted = false;
    this.itemTotals.forEach((item) => {
      if (item.productId == itemTotal.productId) {
        item.total = itemTotal.total;
        inserted = true;
      }
    });

    if (inserted === false) {
      this.itemTotals.push(itemTotal);
    }

    this.total = 0;

    this.itemTotals.forEach((item) => {
      this.total += item.total;
    });
    this.totalRounded = Math.round((this.total + Number.EPSILON) * 100) / 100;
  }

  getOrders() {
    this.orders$ = this.orderService
      .getOrders()
      .subscribe((result) => (this.orders = result));
  }
}
