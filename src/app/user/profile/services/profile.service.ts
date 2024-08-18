import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Password, UserInfo, UserRole } from '@auth/models/auth.model';
import { ApiEndpoint } from '@shared/models/enums/api-endpoint.enum';
import { catchError, Observable, throwError } from 'rxjs';

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
    return this.http
      .get<UserRole>(ApiEndpoint.Profile, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }

  updateUserInformation(body: UserInfo): Observable<object> {
    return this.http
      .put(ApiEndpoint.Profile, body, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }

  updateUserPassword(body: Password): Observable<object> {
    return this.http
      .put(ApiEndpoint.ProfilePassword, body, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
