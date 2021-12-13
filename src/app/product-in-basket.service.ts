import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from './basketItem';

@Injectable({
  providedIn: 'root'
})
export class ProductInBasketService {

  constructor(public httpClient: HttpClient) { }

  
}
