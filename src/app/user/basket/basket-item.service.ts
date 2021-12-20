import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from './basketItem';

@Injectable({
  providedIn: 'root',
})
export class BasketItemService {
  url = "https://bitworks-api.herokuapp.com";
  constructor(private httpClient: HttpClient) {}

  // put an existing basket item
  updateBasketItem(
    id: number | string,
    basketItem: BasketItem
  ): Observable<BasketItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<BasketItem>(
      this.url + '/basket-items/' + id,
      basketItem,
      { headers: headers }
    );
  }

  // post a basket item
  addBasketItem(basketItem: BasketItem): Observable<BasketItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<BasketItem>(
      this.url + '/basket-items',
      {
        headers: headers,
        product: basketItem.productId,
        basket: basketItem.basketId,
        amount: basketItem.amount
      }
    );
  }

  //get all basket items
  getBasketItems(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(this.url + "/basket-items");
  }

  // get all basket items by bakset ID
  getBasketItemsByBasketId(id: string): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(this.url + '/basket-items/findByBasket/'  + id);
  }

  // delete an existing basket item
  deleteBasketItem(id: string): Observable<BasketItem>{
    return this.httpClient.delete<BasketItem>(this.url + '/basket-items/' + id);
  }


}
