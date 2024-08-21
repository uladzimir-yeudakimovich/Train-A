import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Password, UserInfo, UserRole } from '@auth/models/auth.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private role = localStorage.getItem('userRole');

  userRole = signal<UserRole['role']>(
    this.role === 'manager' ? 'manager' : 'user',
  );

  constructor(private readonly http: HttpClient) {}

  getUserInformation(): Observable<UserRole> {
    return this.http.get<UserRole>('profile', httpOptions).pipe(
      tap((res) => {
        this.userRole.set(res.role);
        localStorage.setItem('userRole', res.role);
      }),
      catchError((error) => throwError(() => error)),
    );
  }

  updateUserInformation(body: UserInfo): Observable<object> {
    return this.http
      .put('profile', body, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }

  updateUserPassword(body: Password): Observable<object> {
    return this.http
      .put('profile/password', body, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
