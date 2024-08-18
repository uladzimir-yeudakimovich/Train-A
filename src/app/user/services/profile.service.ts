import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Password, UserInfo, UserRole } from '@auth/models/auth.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userRole = signal<UserRole['role']>('user');

  constructor(private readonly http: HttpClient) {}

  getUserInformation(): Observable<UserRole> {
    return this.http.get<UserRole>('profile', httpOptions).pipe(
      tap(res => this.userRole.set(res.role)),
      catchError((error) => throwError(() => error))
    );
  }

  updateUserInformation(body: UserInfo): Observable<object> {
    return this.http.put('profile', body, httpOptions).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  updateUserPassword(body: Password): Observable<object> {
    return this.http.put('profile/password', body, httpOptions).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}
