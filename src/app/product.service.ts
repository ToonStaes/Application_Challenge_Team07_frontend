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

  // get all products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + "/products?page=0&limit=9&pagination=false");
  }

  //get product by ID
  getProductById(id: string | number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + "/products/" + id);
  }

  // get products by category ID
  getProductsByCategoryId(categoryId: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url+ "/products/findByCategory/"+ categoryId); //waiting for specific call
  }

  // post a new product
  postProduct(product: Product):  Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Product>(this.url + "/products", product, {headers: headers});
  }

  // put an existing product
  putProduct(id: string, product: Product): Observable<Product>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Product>(this.url + "/products/"+id , product, {headers: headers});
  }

  // delete an existing product
  deleteProduct(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(this.url + "/products/" + id);
  }

  // get products by name
  filterByProductName(search: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + "/products/filterByProductName/"+ search.search);
  }

}
