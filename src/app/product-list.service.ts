import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductList } from './productList';


@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private httpClient: HttpClient) {}

  getProductLists(): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(
      'http://localhost:3000/productlists'
    );
  }

  getProductListById(id: number | string): Observable<ProductList> {
    return this.httpClient.get<ProductList>(
      'http://localhost:3000/productlists/' + id
    );
  }

  getProductListByIdWithOrders(id: number | string): Observable<ProductList> {
    return this.httpClient.get<ProductList>(
      'http://localhost:3000/productlists/' + id + '?_embed=orders'
    );
  }

  getProductListsByUserId(id: number | string): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(
      'http://localhost:3000/productlists?userId=' + id
    );
  }

  getProductListsByUserIdWithOrders(id:  number | string): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(
      'http://localhost:3000/productlists?userId=' +
        id +
        '&_embed=orders&isActive=false&_embed=productsInProductLists'
    );
  }
}
