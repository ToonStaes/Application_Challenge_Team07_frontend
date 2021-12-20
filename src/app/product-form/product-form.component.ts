import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  // state booleans
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;

  // id
  productId: string = '';

    // message that could show on page
  errorMessage: string = '';

  //subscriptions
  product$: Subscription = new Subscription();
  postProduct$: Subscription = new Subscription();
  putProduct$: Subscription = new Subscription();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required])
  })
  constructor(private productService: ProductService, private router: Router) {
      this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode == 'add';
      this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === "edit";
      this.productId = this.router.getCurrentNavigation()?.extras.state?.id;
      if (this.productId != null && this.productId != ''){
        this.product$ = this.productService.getProductById(this.productId).subscribe(result => {
          this.productForm.setValue({
            name: result.name,
            price: result.price,
            description: result.description,
            amount: result.stockCount
          });
        });
      }
  }

  ngOnInit(): void {
  }

  // unsubscribe from all subscriptions on destroy
  ngOnDestroy(): void
  {
    this.product$.unsubscribe();
    this.postProduct$.unsubscribe();
    this.putProduct$.unsubscribe();
  }

  onSubmit(): void{
    this.isSubmitted = true;
    // post new product
    if(this.isAdd){
      this.postProduct$ = this.productService.postProduct(this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("/");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    // put edited product
    if (this.isEdit){
      this.putProduct$ = this.productService.putProduct(this.productId, this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("/");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

}
