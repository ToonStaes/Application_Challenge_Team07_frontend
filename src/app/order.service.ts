import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  url = 'https://bitworks-api.herokuapp.com';

  // get all orders
  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url + '/orders');
  }

  // get order by ID
  getOrderById(id: string): Observable<Order> {
    return this.httpClient.get<Order>(this.url + '/orders/' + id);
  }

  // post a new order
  postOrder(order: Order): Observable<Order> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Order>(this.url + '/orders', order, {
      headers: headers,
    });
  }

  // put an existing order
  putOrder(id: string, order: Order): Observable<Order> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Order>(this.url + '/orders/' + id, order, {
      headers: headers,
    });
  }

}
