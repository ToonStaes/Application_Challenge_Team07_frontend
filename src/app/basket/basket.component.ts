import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketService } from '../basket.service';
import { BasketItem } from '../basketItem';
import { ItemTotal } from '../itemTotal';
import { Order } from '../order';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {

  //basketItem
  basket?: Basket;
  //lists
  basketItems: BasketItem[] = [];
  itemTotals: ItemTotal[] = [];

  //totals
  total: number = 0;
  totalRounded: number = 0;

  //subscriptions
  orders$: Subscription = new Subscription();

  constructor(
    private basketService: BasketService,
    private basketItemService: BasketItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var userId = localStorage.getItem('id');
    if (userId != null && userId!= ''){
      this.basketService
        .getBasketsByUserId(userId) //find the active basket
        .subscribe((result) => {
          result.forEach((dbBasket) => {
            if (dbBasket.orderId == null) { // active basket doesn't have an order
              this.basket = dbBasket;
              this.basketItems = [];
              this.basketItemService
                .getBasketItemsByBasketId(this.basket._id) // get basketItems from basket
                .subscribe((dbBasketItems) => {
                  this.basketItems = dbBasketItems;
                  this.basketItems.forEach((item) => {
                    console.log(item.id);
                  });
                });
            }
          });
        });
    }
  }
    // unsubscribe from any subscriptions on destroy
    ngOnDestroy(): void {
      this.orders$.unsubscribe();
    }

    // updates the total amount of an object
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

  // deletes a basket Item
  deleteBasketItem(id: string){
    var index: number = this.basketItems.findIndex(function(o){
      return o._id === 'myid';
    })
    this.basketItems.forEach(basketItem => {
      if (basketItem._id == id){
        this.basketItems.splice(index, 1);
      }
    })
  }

  // navigates to payment form
  goToPayment(basketId: number | string){
    this.router.navigate(['payment-form'], {state: {basketId: basketId}});
  }
}
