import { Injectable } from '@angular/core';
import { Product } from './product';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "https://bitworks-api.herokuapp.com";

  constructor(private httpClient: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + "/products");
  }

  getProductById(id: string | number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + "/products/" + id);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>("http://localhost:3000/products?categoryId="+ categoryId);
  }

  postProduct(products: Product):  Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Product>("http://localhost:3000/products", products, {headers: headers});
  }

  putProduct(id: string, product: Product): Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Product>("http://localhost:3000/products/"+id , product, {headers: headers});
  }
}
