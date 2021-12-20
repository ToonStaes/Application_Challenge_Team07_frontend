import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Basket } from '../../../basket';
import { BasketService } from '../../../basket.service';
import { AuthService } from '../../../security/auth.service';
import { User } from '../../../user';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
})
export class AccountOverviewComponent implements OnInit {
  //state boolean
  isEdit = false;

 // id
  userId = '';

  // user object
  @Input() user: User = {
    _id: '',
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@test.com',
    isAdmin: false,
    isSuperAdmin: false,
    token: '',
    password: '',
  };

  // basket lists
  baskets: Basket[] = [];
  newBaskets: Basket[] = [];


  // message that could show on page
  debugMessage: string = 'test '

  // subscriptions
  baskets$: Subscription = new Subscription();
  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private basketService: BasketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // get user from authservice
    this.user = this.authService.getUser()!;

    // get all user attributes by id from authservice
    if (this.user._id != '') {
      this.user$ = this.userService
        .getUserById(this.user._id)
        .subscribe((result) => {
          this.user = result;
        });

        //get baskets by userID
        this.baskets$ = this.basketService
            .getBasketsByUserId(this.user._id)
            .subscribe((result) => {
              this.newBaskets = result;
              if (this.newBaskets.length != 0) { // only continue if there are baskets
                this.newBaskets.forEach((basket) => { // get all baskets with orders
                  if (basket.order != null) {
                    this.baskets.push(basket);
                  }
                });
              }
            });
    }
  }

    // unsubscribe from all subscriptions on destroy
  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.putUser$.unsubscribe();
    this.baskets$.unsubscribe();
  }

  // toggle isEdit bool
  toggleIsEdit() {
    this.isEdit =  !this.isEdit;
  }
}
