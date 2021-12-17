import { Injectable } from '@angular/core';
import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://bitworks-api.herokuapp.com";

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users");
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.url + "/users/" + id);
  }


  getUserByIdWithProductLists(id: number | string): Observable<User> {
    return this.httpClient.get<User>("http://localhost:3000/users/" + id + "?_embed=productLists");
  }

  postUser(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<User>(this.url + "/users", user, {headers: headers});
  }

  putUser(id:string, user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<User>(this.url + "/users/" + id, user, {headers: headers});
  }

  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(this.url + "/users/" + id);


  getToken(email: string, password: string): Observable<string>{
    let obj = ""
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<string>("https://bitworks-api.herokuapp.com/auth/login", obj, {headers: headers});
  }

}
