import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from './basketItem';

@Injectable({
  providedIn: 'root',
})
export class BasketItemService {
  constructor(private httpClient: HttpClient) {}

  updateBasketItem(
    id: number | string,
    basketItem: BasketItem
  ): Observable<BasketItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<BasketItem>(
      'http://localhost:3000/basketItems/' + id,
      basketItem,
      { headers: headers }
    );
  }

  addBasketItem(basketItem: BasketItem): Observable<BasketItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<BasketItem>(
      'http://localhost:3000/basketItems',
      basketItem,
      { headers: headers }
    );
  }

  getProductsByBasketId(basketId: number | string): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(
      'http://localhost:3000/basketItems?basketId=' + basketId.toString()
    );
  }

  getBasketItems(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(
      'http://localhost:3000/basketitems'
    );
  }

  getBasketItemsByBasketId(id: number | string): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(
      'http://localhost:3000/basketitems?basketId=' + id
    );
  }

  getBasketItemsByBasketIdWithProduct(
    id: number | string
  ): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(
      'http://localhost:3000/basketitems?basketId=' + id + '&_expand=product'
    );
  }
}
