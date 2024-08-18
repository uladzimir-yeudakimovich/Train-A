import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@shared/models/enums/api-endpoint.enum';
import { User } from '@user/orders/interfaces';
import { catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  public getUsers() {
    return this.http
      .get<User[]>(ApiEndpoint.Users, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
