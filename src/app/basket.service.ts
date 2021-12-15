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

  getBasketsByUserId(userId: number): Observable<Basket[]> {
    return this.httpClient.get<Basket[]>("http://localhost:3000/baskets?userId=" + userId.toString())
  }

}
