import { Injectable } from '@angular/core';
import { Category } from './category';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:3000/categories');
  }

  getCategoryById(id: number | string): Observable<Category> {
    return this.httpClient.get<Category>(
      'http://localhost:3000/categories/' + id
    );
  }

  postCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Category>(
      'http://localhost:3000/categories',
      category,
      { headers: headers }
    );
  }

  putCategory(id: number | string, category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Category>(
      'http://localhost:3000/categories/' + id,
      category,
      { headers: headers }
    );
  }

  toNonActiveCategory(id: number | string): Observable<Category> {
    return this.httpClient.delete<Category>(
      'http://localhost:3000/categories/' + id
    );
  }
}
