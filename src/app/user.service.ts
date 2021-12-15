import { Injectable } from '@angular/core';
import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:3000/users");
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>("http://localhost:3000/users/" + id);
  }

  getUserByIdWithProductLists(id: number): Observable<User> {
    return this.httpClient.get<User>("http://localhost:3000/users/" + id + "?_embed=productLists");
  }

  postUser(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<User>("http://localhost:3000/users", user, {headers: headers});
  }

  putUser(id:number, user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<User>("http://localhost:3000/users/" + id, user, {headers: headers});
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>("http://localhost:3000/users/" + id);
  }

  getToken(email: string, password: string): Observable<string>{
    let obj = ""
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<string>("https://bitworks-api.herokuapp.com/auth/login", obj, {headers: headers});
  }

}
