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

  updateBasketItem(id: string, basketItem: BasketItem): Observable<BasketItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<BasketItem>(
      this.url + '/basket-items/' + id,
      basketItem,
      { headers: headers }
    );
  }

  addBasketItem( basketItem: BasketItem): Observable<BasketItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<BasketItem>( this.url + "/basket-items", basketItem, {headers: headers});
  }

  // getProductsByBasketId(basketId: string): Observable<BasketItem[]> {
  //   return this.httpClient.get<BasketItem[]>(
  //     'http://localhost:3000/basketItems?basketId=' + basketId.toString()
  //   );
  // }

  getBasketItems(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(this.url + "/basket-items");
  }

  getBasketItemsByBasketId(id: string): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(this.url + '/basket-items/findByBasket/'  + id);
  }

  // getBasketItemsByBasketIdWithProduct(id: string): Observable<BasketItem[]> {
  //   return this.httpClient.get<BasketItem[]>("http://localhost:3000/basketitems?basketId=" + id + "&_expand=product");
  // }


}
