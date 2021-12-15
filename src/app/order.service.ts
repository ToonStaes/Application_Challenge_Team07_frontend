import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
   }

   getOrders(): Observable<Order[]>{
     return this.httpClient.get<Order[]>("http://localhost:3000/orders");
   }

   getOrderById(id: string): Observable<Order>{
     return this.httpClient.get<Order>("http://localhost:3000/orders/"+ id);
   }

   putOrder(id: string, order: Order): Observable<Order>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      return this.httpClient.put<Order>("http://localhost:3000/orders/"+id, order, {headers: headers});
   }

   postOrder(order: Order): Observable<Order>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Order>("http://localhost:3000/orders", order, {headers: headers});
   }
}
