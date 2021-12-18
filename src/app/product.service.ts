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

  getProductsByCategoryId(categoryId: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url+ "/products/findByCategory/"+ categoryId); //waiting for specific call
  }

  postProduct(product: Product):  Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Product>(this.url + "/products", product, {headers: headers});
  }

  putProduct(id: string, product: Product): Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Product>(this.url + "/products/"+id , product, {headers: headers});
  }

  deleteProduct(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(this.url + "/products/" + id);
  }

}
