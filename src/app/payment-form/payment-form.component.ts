import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
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

  // messages that could appear on the page
  errorMessage: string = '';

  // subscriptions
  order$: Subscription = new Subscription();
  postPayment$: Subscription = new Subscription();

  // reactive from formcontrol
  paymentForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    date: new FormControl(new Date().toISOString().substring(0,16)),
    isPaid: new FormControl(''),
    basket: new FormControl(this.basketId),
  });

  constructor(private router: Router, private orderService: OrderService) {
    // get basket id from router state
    this.basketId = this.router.getCurrentNavigation()?.extras.state?.basketId;
  }

  ngOnInit(): void {}

   // unsubscribe from all subscriptions on destroy
   ngOnDestroy(): void
   {
     this.order$.unsubscribe();
     this.postPayment$.unsubscribe();
   }

   // post the order & navigate to homepage
  onSubmit(): void {
    this.isSubmitted = true;
    //update values
    this.paymentForm.patchValue({
      basket: this.basketId,
      isPaid: true,
    });
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
