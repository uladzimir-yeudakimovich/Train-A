import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SearchStore } from '@home/store/search.store';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { OrderStore } from '@shared/store/orders/orders.store';
import { Observable, tap } from 'rxjs';

import { Credentials, Token } from '../models/auth.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    SkipAuthorization: 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = signal<boolean>(!!localStorage.getItem('token'));

  private orderStore = inject(OrderStore);

  private searchStore = inject(SearchStore);

  constructor(private http: HttpClient) {}

  registration(credentials: Credentials): Observable<object> {
    return this.http.post<object>(ApiPath.SignUp, credentials, httpOptions);
  }

  login(credentials: Credentials): Observable<Token> {
    const { email } = credentials;
    return this.http.post<Token>(ApiPath.SignIn, credentials, httpOptions).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', email);
        this.isLogin.set(true);
      }),
    );
  }

  logout(): void {
    this.orderStore.clear();
    this.searchStore.clear();

    this.http
      .delete(ApiPath.Logout)
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('userRole');
          this.isLogin.set(false);
        }),
      )
      .subscribe();
  }
}
