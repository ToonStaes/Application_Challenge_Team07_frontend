import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../category';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  category: Category = {id: 0, name: "test category"}
  @Input() product: Product = { id: 0, name: "Test Product", price: 0.00, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", isActive: true, amountInStock: 0, rating: 5, categoryId: 1, category: this.category };

  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  debugMessage: string = '';

  product$: Subscription = new Subscription();

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.product$ = this.productService.getProductById(+productId).subscribe(result => this.product = result);
      this.debugMessage += "product get" + productId
    }

  }

}
