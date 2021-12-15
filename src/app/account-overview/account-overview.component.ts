import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductListService } from '../product-list.service';
import { ProductList } from '../productList';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {


  isEdit = false
  userId = 1

  @Input() user: User = { id: 0, firstName: "firstname",lastName: "lastname",email: "email@test.com",password: "password",isAdmin: false,isSuperAdmin: false, token: ''};

  productLists:ProductList[] = []

  productLists$: Subscription = new Subscription();
  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private productListService: ProductListService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(+this.userId).subscribe(result => this.user = result);
    this.productLists$ = this.productListService.getProductListsByUserIdWithOrders(+this.userId).subscribe(result => this.productLists = result);
  }

  toggleIsEdit(){
    if (this.isEdit) {
      this.isEdit = false;
    }
    else{
      this.isEdit = true;
    }
  }



}
