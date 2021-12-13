import { Injectable } from '@angular/core';
import { Product } from './product';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/products?_expand=category");
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>("http://localhost:3000/products/" + id + "?_expand=category");
  }

  getProductsByCategory(categoryId: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>("http://localhost:3000/products?categoryId="+ categoryId);
  }

  postProduct(products: Product):  Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Product>("http://localhost:3000/products", products, {headers: headers});
  }

  putProduct(id: number, product: Product): Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Product>("http://localhost:3000/products/"+id , product, {headers: headers});
  }
}
