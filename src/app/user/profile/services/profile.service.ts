import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
  constructor(private readonly http: HttpClient) {}

  getUserInformation(): Observable<UserRole> {
    return this.http.get<UserRole>('profile', httpOptions).pipe(
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
