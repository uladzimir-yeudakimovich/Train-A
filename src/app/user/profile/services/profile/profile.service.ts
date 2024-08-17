import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../constants/constants';
import { ApiEndpoint } from '../../enums/api-endpoint.enum';
import {
  UpdateInformationRequestBody,
  UpdatePasswordRequestBody,
  UserProfileResponse,
} from '../../interfaces';
import { getLocalStorage } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

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

  // TODO: replace by auth service or interceptor
  private getHttpOptions(): { headers: { Authorization: string } } {
    return {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN_KEY) ?? ''}`,
      },
    };
  }
}
