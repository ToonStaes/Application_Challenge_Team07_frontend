import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../admin/category/category';
import { CategoryService } from '../admin/category/category.service';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketItem } from '../basketItem';

import { ItemTotal } from '../itemTotal';
import { Product } from '../admin/product/product';
import { ProductService } from '../admin/product/product.service';


@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent implements OnInit {
  @Input() basketItem: BasketItem = {
    id: '',
    _id: '',
    basketId: '',
    productId: '',
    amount: 0,
    product: {} as Product,
    basket: {} as Basket
  };

  @Output() sendItemAmountEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteBasketItemEvent: EventEmitter<any> = new EventEmitter();

  product?: Product;
  category?: Category;
  isLoading: Boolean = true;
  itemTotal: ItemTotal = { productId: '0', total: 0 };


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private basketItemService: BasketItemService
  ) {}

  ngOnInit(): void {
    this.amountForm.setValue({
      amount: this.basketItem.amount,
    });
    this.productService
      .getProductById(this.basketItem.product!._id!)
      .subscribe((dbProduct) => {
        this.product = dbProduct;

        this.itemTotal.productId = this.product._id!;

        this.itemTotal.total =
          Math.round(
            (this.product.price * this.basketItem.amount + Number.EPSILON) * 100
          ) / 100;
        this.sendItemAmountEvent.emit(this.itemTotal);

        this.categoryService
          .getCategoryById(this.product.category!._id!)
          .subscribe((dbCategory) => {
            this.category = dbCategory;
            this.isLoading = false;
          }, (error) => {
            console.log(error)
          });
      });
  }

  // Form for amount
  amountForm = new FormGroup({
    amount: new FormControl(''),
  });

  amountChanged() {
    this.basketItem.amount = this.amountForm.value.amount;

    this.itemTotal.total =
      Math.round(
        (this.product!.price * this.basketItem.amount + Number.EPSILON) * 100
      ) / 100;

    this.basketItemService
      .updateBasketItem(this.basketItem._id!, this.basketItem)
      .subscribe(
        (result) => {
        },
        (error) => {
          console.log(error);
        }
      );

      this.sendItemAmountEvent.emit(this.itemTotal);
  }

  removeFromBasket(basketItemId: string){
    this.basketItemService.deleteBasketItem(basketItemId).subscribe(result => {
      this.deleteBasketItemEvent.emit(basketItemId)
    })
  }
}
