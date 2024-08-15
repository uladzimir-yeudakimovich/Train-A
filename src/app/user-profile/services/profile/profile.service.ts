import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, throwError, map } from 'rxjs';
import {
  UpdateInformationRequestBody,
  UpdatePasswordRequestBody,
  UserProfileResponse,
} from '../../interfaces';
import { FAKE_CREDENTIALS, LOCAL_STORAGE_TOKEN_KEY } from '../../constants/constants';
import { getLocalStorage, setLocalStorage } from '../../utils/utils';

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
        map((response) => response as { token: string }),
        tap((response) => setLocalStorage(LOCAL_STORAGE_TOKEN_KEY, response.token)),
        catchError((error) => throwError(() => error)),
      )
      .subscribe();
  }

  public getUserInformation(): Observable<UserProfileResponse> {
    return this.http
      .get<UserProfileResponse>('/api/profile', {
        headers: { Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN_KEY) ?? ''}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserInformation(body: UpdateInformationRequestBody) {
    return this.http
      .put('/api/profile', body, {
        headers: { Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN_KEY) ?? ''}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserPassword(body: UpdatePasswordRequestBody) {
    return this.http
      .put('/api/profile/password', body, {
        headers: { Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN_KEY) ?? ''}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public logout() {
    return this.http
      .delete('/api/logout', {
        headers: { Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN_KEY) ?? ''}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
