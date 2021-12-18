import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result) => {
      result.forEach((item) => {
        this.products.push(item)
      })
    })
  }

  edit(product: Product){
    console.log(product)
  }

  toggleActive(product: Product){
    console.log(product)
  }
}
