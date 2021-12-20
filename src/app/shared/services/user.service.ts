import { Injectable } from '@angular/core';
import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'https://bitworks-api.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  // get all users
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/users');
  }

  // get user by ID
  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.url + '/users/' + id);
  }

  // post a new user
  postUser(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<User>(this.url + '/users', user, {
      headers: headers,
    });
  }

  // put an existing user
  putUser(id: string, user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<User>(this.url + '/users/' + id, user, {
      headers: headers,
    });
  }

  // delete an existing user
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(this.url + '/users/' + id);
  }
}
