import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    basketId: '',
    productId: '',
    amount: 0,
    product: {} as Product,
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
        this.product = dbProduct;

        this.itemTotal.productId = this.product._id;

        this.itemTotal.total =
          Math.round(
            (this.product.price * this.basketItem.amount + Number.EPSILON) * 100
          ) / 100;
        this.sendItemAmountEvent.emit(this.itemTotal);

        this.categoryService
          .getCategoryById(this.product.categoryId)
          .subscribe((dbCategory) => {
            this.category = dbCategory;
            this.isLoading = false;
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
      .updateBasketItem(this.basketItem.id, this.basketItem)
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
