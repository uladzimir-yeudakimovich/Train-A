import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@shared/models/enums/api-endpoint.enum';
import { Ride } from '@user/orders/interfaces';
import { catchError, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  public getRideInformation(rideId: number): Observable<Ride> {
    return this.http
      .get<Ride>(ApiEndpoint.Search + `/${rideId}`, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
