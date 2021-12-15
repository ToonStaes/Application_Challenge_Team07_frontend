import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from './basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  url = "https://bitworks-api.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  getBasketsByUserId(userId: string): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>("http://localhost:3000/baskets?userId=" + userId.toString())
  }

  getBaskets(): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(this.url + "/baskets");
  }

  getBasketById(id: string): Observable<Basket> {
    return this.httpClient.get<Basket>(this.url + "/baskets/" + id);
  }

  getBasketByIdWithOrders(id: string): Observable<Basket> {
    return this.httpClient.get<Basket>("http://localhost:3000/baskets/" + id + "?_embed=orders");
  }

  getBasketsByUserIdWithOrders(id: number): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>("http://localhost:3000/baskets?userId=" + id+ "&_embed=orders&_embed=basketItems");
  }

  postBasket(basket: Basket):  Observable<Basket>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Basket>(this.url + "/baskets", basket, {headers: headers});
  }

  putBasket(id: string, basket: Basket): Observable<Basket>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Basket>(this.url + "/baskets/"+id , basket, {headers: headers});
  }

  deleteBasket(id: string): Observable<Basket> {
    return this.httpClient.delete<Basket>(this.url + "/baskets/" + id);
  }
}
