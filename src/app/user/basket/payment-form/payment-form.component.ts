import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../order.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { User } from '../../../user';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  // id's
  orderId: string = '';
  basketId: string = '';

  // state boolean
  isSubmitted: boolean = false;
    isLoading: boolean = true;

  // messages that could appear on the page
  errorMessage: string = '';

  // subscriptions
  order$: Subscription = new Subscription();
  postPayment$: Subscription = new Subscription();
  user?: User;

  // reactive from formcontrol
  paymentForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    date: new FormControl(new Date().toISOString().substring(0,16)),
    isPaid: new FormControl(''),
    basket: new FormControl(this.basketId),
  });


  constructor(private router: Router, private orderService: OrderService, private userService: UserService) {
  // get basket id from router state
    this.basketId = this.router.getCurrentNavigation()?.extras.state?.basketId;
    var userId = localStorage.getItem('id')
    if (userId != null && userId != ''){
      userService.getUserById(userId).subscribe(result => {
        this.user = result
        this.isLoading = false
      })
    }
  }

  ngOnInit(): void {}


  onSubmit(e: Event): void {
    e.preventDefault()
    this.isSubmitted = true;
    //update values
    this.paymentForm.patchValue({
      basket: this.basketId,
      isPaid: true,
    });

    emailjs
      .sendForm(
        'bitworks',
        'order',
        e.target as HTMLFormElement,
        'user_oFkMjTJpruoMijXStUN1J'
      )
      .then(
        (result: EmailJSResponseStatus) => {
        },
        (error) => {
          console.log(error)
        }
      );

    this.postPayment$ = this.orderService
      .postOrder(this.paymentForm.value)
      .subscribe(
        (result) => {
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }
}
