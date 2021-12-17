import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  orderId: string='';
  basketId: number=0;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  order$: Subscription = new Subscription();
  postPayment$: Subscription = new Subscription();

  paymentForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    date: new FormControl(''),
    isPaid: new FormControl(''),
    basketId: new FormControl(this.basketId),
  });

  constructor(private router: Router, private orderService: OrderService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode == 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.orderId = this.router.getCurrentNavigation()?.extras.state?.id;
    this.basketId = +this.router.getCurrentNavigation()?.extras.state?.basket_id;
    if (this.orderId != null && this.orderId!=''){
      this.order$ = this.orderService.getOrderById(this.orderId).subscribe(result => {
        this.paymentForm.setValue({
          address: result.address,
          city: result.city,
          postalCode: result.postalCode,
          date: Date.now(),
          isPaid: false,
          basket_id: this.basketId
        });
      });
    }
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.paymentForm.patchValue({
      basket_id: this.basketId,
      isPaid: true
    });
    console.log(this.paymentForm.value);
    this.postPayment$ = this.orderService.postOrder(this.paymentForm.value).subscribe(result=> {
      this.router.navigateByUrl("/");
  },
  error => {
    this.errorMessage = error.message;
  });
  }
}

