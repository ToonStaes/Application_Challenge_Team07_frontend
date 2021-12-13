import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Basket } from '../basket';
import { BasketService } from '../basket.service';
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

  @Input() user: User = { id: 0, firstName: "firstname",lastName: "lastname",email: "email@test.com",password: "password",isAdmin: false,isSuperAdmin: false};

  baskets:Basket[] = []
  newBaskets:Basket[] = []

  baskets$: Subscription = new Subscription();
  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(+this.userId).subscribe(result => this.user = result);
    this.baskets$ = this.basketService.getBasketsByUserId(+this.userId).subscribe(result => this.newBaskets = result);

    this.user$ = this.userService.getUserById(+this.userId).subscribe(result => {
      this.user = result
      this.baskets$ = this.basketService.getBasketsByUserIdWithOrders(+this.userId).subscribe(result => {
        this.newBaskets = result
        if (this.newBaskets.length != 0) {
          this.newBaskets.forEach(basket => {
            if (basket.orderId != null) {
              this.baskets.push(basket);
            }
          });
        }
      });
    });



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
