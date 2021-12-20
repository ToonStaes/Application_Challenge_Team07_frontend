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
  basketEmpty: boolean = true;
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
    var userId = localStorage.getItem('id');
    if (userId != null && userId!= ''){
      this.basketService
        .getBasketsByUserId(userId)
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


                  // controleer of het winkelmandje gevuld is
                  // console.log(this.basketItems.length)
                  if  (this.basketItems.length == 0){
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

                  this.basketItems.forEach((item) => {
                    console.log(item.id);
                  });
                });

            }
          });
        });

    }



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

  deleteBasketItem(id: string){
    var index: number = this.basketItems.findIndex(function(o){
      return o._id === 'myid';
    })
    this.basketItems.forEach(basketItem => {
      if (basketItem._id == id){
        this.basketItems.splice(index, 1);
      }
    })


    // controleer of het winkelmandje gevuld is
    // console.log(this.basketItems.length)
    if  (this.basketItems.length == 0){
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

  getOrders() {
    this.orders$ = this.orderService
      .getOrders()
      .subscribe((result) => (this.orders = result));
  }

  goToPayment(basketId: number | string){
    this.router.navigate(['payment-form'], {state: {basketId: basketId}});
  }
}
