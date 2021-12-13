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
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  productId: number = 0;
  errorMessage: string = '';
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
      this.productId = +this.router.getCurrentNavigation()?.extras.state?.id;
      if (this.productId != null && this.productId > 0){
        this.product$ = this.productService.getProductById(this.productId).subscribe(result => {
          this.productForm.setValue({
            name: result.name,
            price: result.price,
            description: result.description,
            amount: result.amountInStock
          });
        });
      }
   }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.isAdd){
      this.postProduct$ = this.productService.postProduct(this.productForm.value).subscribe(result => {
        this.router.navigateByUrl("/");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
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
