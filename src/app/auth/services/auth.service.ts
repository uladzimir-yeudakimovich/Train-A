import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@shared/models/enums/api-endpoint.enum';
import { Observable, tap } from 'rxjs';
import { Credentials, Token } from '../models/auth.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'SkipAuthorization': 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registration(credentials: Credentials): Observable<object> {
    return this.http.post<object>(ApiEndpoint.SignUp, credentials, httpOptions);
  }

  login(credentials: Credentials): Observable<Token> {
    const { email } = credentials;
    return this.http.post<Token>(ApiEndpoint.SignIn, credentials, httpOptions).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', email);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
