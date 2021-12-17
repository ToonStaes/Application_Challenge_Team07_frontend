import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Basket } from '../basket';
import { BasketItemService } from '../basket-item.service';
import { BasketItem } from '../basketItem';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ItemTotal } from '../itemTotal';
import { Product } from '../product';
import { ProductService } from '../product.service';

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
      .getProductById(this.basketItem.productId)
      .subscribe((dbProduct) => {
        console.log(dbProduct)
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
            console.log("category")
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
    console.log('onChange werkt, amount: ' + this.amountForm.value.amount);
    console.log(this.basketItem.id);
    this.basketItem.amount = this.amountForm.value.amount;

    this.itemTotal.total =
      Math.round(
        (this.product!.price * this.basketItem.amount + Number.EPSILON) * 100
      ) / 100;

    this.sendItemAmountEvent.emit(this.itemTotal);

    this.basketItemService
      .updateBasketItem(this.basketItem.id!, this.basketItem)
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
