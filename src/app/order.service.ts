import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "https://bitworks-api.herokuapp.com";

  constructor(private httpClient: HttpClient) {
   }

   getOrders(): Observable<Order[]>{
     return this.httpClient.get<Order[]>(this.url + "/orders");
   }

   getOrderById(id: string): Observable<Order>{
     return this.httpClient.get<Order>(this.url + "/orders/"+ id);
   }

   putOrder(id: string, order: Order): Observable<Order>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      return this.httpClient.put<Order>(this.url + "/orders/"+id, order, {headers: headers});
   }

   postOrder(order: Order): Observable<Order>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Order>(this.url + "/orders", order, {headers: headers});
   }
}
