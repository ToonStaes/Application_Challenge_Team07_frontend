import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductFormComponent } from 'src/app/product-form/product-form.component';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result) => {
      result.forEach((item) => {
        this.products.push(item)
      })
    })
  }

  edit(product: Product){
    this.router.navigateByUrl('editProduct/' + product._id)
  }

  toggleActive(product: Product){
    product.isActive = !product.isActive

    this.productService.putProduct(product._id!, product).subscribe(result => {
      product = result;
      this.products.forEach(item => {
        if (item._id! === product._id!){
          item = product
        }
      })
    })
  }

  addProduct(){
    this.router.navigateByUrl('newProduct')
  }
}
