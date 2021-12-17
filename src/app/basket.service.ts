import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from './basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClient: HttpClient) {}

  getBasketsByUserId(userId: number | string): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(
      'http://localhost:3000/baskets?userId=' + userId.toString()
    );
  }

  getBaskets(): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>('http://localhost:3000/baskets');
  }

  getBasketById(id: number | string): Observable<Basket> {
    return this.httpClient.get<Basket>('http://localhost:3000/baskets/' + id);
  }

  getBasketByIdWithOrders(id: number | string): Observable<Basket> {
    return this.httpClient.get<Basket>(
      'http://localhost:3000/baskets/' + id + '?_embed=orders'
    );
  }

  getBasketsByUserIdWithOrders(id: number | string): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>(
      'http://localhost:3000/baskets?userId=' +
        id +
        '&_embed=orders&_embed=basketItems'
    );
  }
}
