import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from './userResponse';
import { User } from '../shared/services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUser(): User | null {
    if (this.isLoggedIn()) {
      return {
        _id: localStorage.getItem('id') ?? '0',
        email: localStorage.getItem('email') ?? '',
        password: '',
        token: this.getToken(),
        firstName: '',
        lastName: '',
        isAdmin: false,
        isSuperAdmin: false,
      };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(user: User): Observable<UserResponse> {

    return this.httpClient.post<UserResponse>(
      'https://bitworks-api.herokuapp.com/auth/login',
      user
    );
  }

  register(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      'https://bitworks-api.herokuapp.com/users',
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        isAdmin: false,
        isSuperAdmin: false,
      }
    );
  }
}
