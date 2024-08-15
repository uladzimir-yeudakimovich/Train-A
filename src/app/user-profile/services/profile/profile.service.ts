import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, throwError } from 'rxjs';

import {
  UpdateInformationRequestBody,
  UpdatePasswordRequestBody,
  UserProfileResponse,
} from '../../interfaces';

// TODO: replace by auth service
const FAKE_CREDENTIALS = {
  email: 'cc@cc.com',
  password: 'dddddddd',
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  // TODO: replace by auth service
  public signUp(): Observable<object> {
    return this.http.post('/api/signup', FAKE_CREDENTIALS);
  }

  // TODO: replace by auth service
  public signIn(): void {
    this.http
      .post('/api/signin', FAKE_CREDENTIALS)
      .pipe(
        tap((response) => {
          // window.localStorage.setItem('token', response.token);
          console.log('FROM TAP', response);
        }),
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  public getUserInformation(token: string): Observable<UserProfileResponse> {
    return this.http
      .get<UserProfileResponse>('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserInformation(token: string, body: UpdateInformationRequestBody) {
    return this.http
      .put('/api/profile', body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserPassword(token: string, body: UpdatePasswordRequestBody) {
    return this.http
      .put('/api/profile/password', body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public logout(token: string) {
    return this.http
      .delete('/api/logout', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
