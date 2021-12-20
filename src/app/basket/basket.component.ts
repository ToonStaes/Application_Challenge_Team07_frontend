import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketService } from '../basket.service';
import { BasketItem } from '../basketItem';
import { ItemTotal } from '../itemTotal';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basketEmpty: boolean = true;

  //basketItem
  basket?: Basket;

  //lists
  itemTotals: ItemTotal[] = [];
  basketItems: BasketItem[] = [];

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
            if (dbBasket.order == null) { // active basket doesn't have an order
              this.basket = dbBasket;
              this.basketItems = [];
              this.basketItemService
                .getBasketItemsByBasketId(this.basket._id) // get basketItems from basket
                .subscribe((dbBasketItems) => {
                  this.basketItems = dbBasketItems;
                  if  (this.basketItems.length == 0){
                    this.basketEmpty = true;
                  }
                  if (this.basketItems.length > 0){
                    this.basketEmpty = false;
                  }
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
    this.basketItems.forEach(item => {
      if (item._id === id) {
        var index = this.basketItems.indexOf(item)
        this.basketItems.splice(index, 1);
      }
    })

    this.itemTotals = []

    this.basketItems.forEach(item => {
      var itemTotal = {} as ItemTotal;
      itemTotal.productId = item.productId
      itemTotal.total = item.amount * item.product.price
      this.itemTotals.push(itemTotal)
      this.updateTotal(itemTotal)
    })

    // controleer of het winkelmandje gevuld is
    // console.log(this.basketItems.length)
    if (this.basketItems.length == 0){
      this.basketEmpty = true;
      // console.log("WINKELMANDJE LEEG")
      // console.log(this.basketEmpty)
    }

    if (this.basketItems.length > 0){
      this.basketEmpty = false;
      // console.log("WINKELMANDJE GEVULD")
      // console.log(this.basketEmpty)
    }
    console.log(this.basketItems.length)
  }

  // navigates to payment form
  goToPayment(basketId: number | string){
    this.router.navigate(['payment-form'], {state: {basketId: basketId}});
  }
}
