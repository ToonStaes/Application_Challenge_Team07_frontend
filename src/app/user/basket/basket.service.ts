import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from './basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClient: HttpClient) {}
  url = 'https://bitworks-api.herokuapp.com';



  // get all baskets
  getBaskets(): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(this.url + '/baskets');
  }

  // get all baskets by user ID
  getBasketsByUserId(userId: string): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(
      this.url + '/baskets/findByUser/' + userId
    );
  }

  // get basket by ID
  getBasketById(id: number | string): Observable<Basket> {
    return this.httpClient.get<Basket>(this.url + '/baskets/' + id);
  }

  // post a new basket
  postBasket(basket: Basket): Observable<Basket> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Basket>(this.url + '/baskets', basket, {
      headers: headers,
    });
  }

  // put an existing basket
  putBasket(id: string, basket: Basket): Observable<Basket> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Basket>(this.url + '/baskets/' + id, basket, {
      headers: headers,
    });
  }

  // delete an existing basket
  deleteBasket(id: string): Observable<Basket> {
    return this.httpClient.delete<Basket>(this.url + '/baskets/' + id);
  }
}
