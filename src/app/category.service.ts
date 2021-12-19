import { Injectable } from '@angular/core';
import { Category } from './category';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'https://bitworks-api.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + '/categories');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(this.url + '/categories/' + id);
  }

  postCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Category>(this.url + '/categories', {
      headers: headers,
      name: category.name,
      isActive: category.isActive
    });
  }

  putCategory(id: string, category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log('id: ' + id)
    console.log(category);
    return this.httpClient.put<Category>(
      this.url + '/categories/' + id,{
        headers: headers,
        name: category.name,
        isActive: category.isActive
      });
  }

  deleteCategory(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(this.url + '/categories/' + id);
  }

  // toNonActiveCategory(id: number | string): Observable<Category> {
  //   return this.httpClient.delete<Category>(
  //     'http://localhost:3000/categories/' + id
  //   );
  // }
}
