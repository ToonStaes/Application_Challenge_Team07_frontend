import { Component, OnInit } from '@angular/core';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketService } from '../basket.service';
import { BasketItem } from '../basketItem';
import { ItemTotal } from '../itemTotal';
import { Product } from '../product';
import { ProductInBasketService } from '../product-in-basket.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket?: Basket;
  basketItems: BasketItem[] = [];
  products: Product[] = [];
  total: number = 0;
  totalRounded: number = 0;
  itemTotals: ItemTotal[] = []

  constructor(private basketService: BasketService, private basketItemService: BasketItemService, private productService: ProductService) { }

  ngOnInit(): void {
    this.basketService.getBasketsByUserId(1).subscribe((result) => {
      result.forEach(dbBasket => {
        if (dbBasket.orderId == null){
          console.log("basket found")
          console.log(dbBasket._id)
          this.basket = dbBasket;
          this.basketItems = [];
          this.basketItemService.getProductsByBasketId(this.basket._id).subscribe((dbBasketItems) => {
            console.log("basketItems found")
            console.log(dbBasketItems)
            this.basketItems = dbBasketItems;
            this.basketItems.forEach(item => {
              console.log(item._id)
            })
          })
        }
      });
    })
  }

  updateTotal(itemTotal: ItemTotal){
    let inserted = false;
    this.itemTotals.forEach(item => {
      if (item.productId == itemTotal.productId){
        item.total = itemTotal.total;
        inserted = true
      }
    })

    if (inserted === false) {
      this.itemTotals.push(itemTotal)
    }

    this.total = 0;

    this.itemTotals.forEach(item => {
      this.total += item.total
    })
    this.totalRounded = Math.round((this.total + Number.EPSILON) * 100) / 100;
  }

}
