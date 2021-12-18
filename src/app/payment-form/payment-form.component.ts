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
  orderId: string = '';
  basketId: string = '';
  isSubmitted: boolean = false;
  errorMessage: string = '';
  order$: Subscription = new Subscription();
  postPayment$: Subscription = new Subscription();

  paymentForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    date: new FormControl(new Date().toISOString().substring(0,16)),
    isPaid: new FormControl(''),
    basket: new FormControl(this.basketId),
  });

  constructor(private router: Router, private orderService: OrderService) {
    console.log(this.router.getCurrentNavigation());
    this.basketId = this.router.getCurrentNavigation()?.extras.state?.basketId;
    console.log(this.basketId);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitted = true;
    this.paymentForm.patchValue({
      basket: this.basketId,
      isPaid: true,
    });
    console.log(this.paymentForm.value);
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
