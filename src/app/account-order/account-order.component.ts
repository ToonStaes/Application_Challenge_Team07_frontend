import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductListService } from '../product-list.service';
import { ProductList } from '../productList';

@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.scss']
})
export class AccountOrderComponent implements OnInit {

  @Input() productList: ProductList = { id: 0, userId: 0,isActive: true,orders: [], productInProductLists: []};
  totalProducts = 0

  constructor() { }

  ngOnInit(): void {
    this.productList.productInProductLists.forEach(product => {
      this.totalProducts += product.amount;
    });
  }

}
