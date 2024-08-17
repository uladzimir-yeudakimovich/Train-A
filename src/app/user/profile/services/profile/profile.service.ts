import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, throwError, map } from 'rxjs';
import {
  UpdateInformationRequestBody,
  UpdatePasswordRequestBody,
  UserProfileResponse,
} from '../../interfaces';
import { FAKE_CREDENTIALS, LOCAL_STORAGE_TOKEN_KEY } from '../../../constants/constants';
import { getLocalStorage, setLocalStorage } from '../../utils/utils';
import { ApiEndpoint } from '../../enums/api-endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  // TODO: replace by auth service
  public signUp(): Observable<object> {
    return this.http.post(ApiEndpoint.SignUp, FAKE_CREDENTIALS);
  }

  // TODO: replace by auth service
  public signIn(): void {
    this.http
      .post(ApiEndpoint.SignIn, FAKE_CREDENTIALS)
      .pipe(
        map((response) => response as { token: string }),
        tap((response) => setLocalStorage(LOCAL_STORAGE_TOKEN_KEY, response.token)),
        catchError((error) => throwError(() => error)),
      )
      .subscribe();
  }

  public getUserInformation(): Observable<UserProfileResponse> {
    return this.http
      .get<UserProfileResponse>(ApiEndpoint.Profile, this.getHttpOptions())
      .pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserInformation(body: UpdateInformationRequestBody): Observable<object> {
    return this.http
      .put(ApiEndpoint.Profile, body, this.getHttpOptions())
      .pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserPassword(body: UpdatePasswordRequestBody): Observable<object> {
    return this.http
      .put(ApiEndpoint.ProfilePassword, body, this.getHttpOptions())
      .pipe(catchError((error) => throwError(() => error)));
  }

  public logout(): Observable<object> {
    return this.http
      .delete(ApiEndpoint.Logout, this.getHttpOptions())
      .pipe(catchError((error) => throwError(() => error)));
  }

  // TODO: replace by auth service
  private getHttpOptions(): { headers: { Authorization: string } } {
    return {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN_KEY) ?? ''}`,
      },
    };
  }
}
