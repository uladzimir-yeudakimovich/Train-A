import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '@shared/models/enums/api-endpoint.enum';
import { Order, OrderBody } from '@user/orders/interfaces';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { SearchService } from '../search/search.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly http: HttpClient,
    private readonly searchService: SearchService,
  ) {}

  public getOrders({ all = false } = {}): Observable<Order[]> {
    return this.http
      .get<Order[]>(ApiEndpoint.Order, { ...httpOptions, params: { all } })
      .pipe(catchError((error) => throwError(() => error)));
  }

  // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  public makeOrder(rideId: number): Observable<{ id: number }> {
    return this.searchService.getRideInformation(rideId).pipe(
      switchMap((ride) => {
        const FAKE_ORDER: OrderBody = {
          rideId: ride.rideId,
          seat: Math.floor(Math.random() * 50) + 1,
          stationStart: ride.path[0],
          stationEnd: ride.path[ride.path.length - 1],
        };
        return this.http.post<{ id: number }>(ApiEndpoint.Order, FAKE_ORDER, httpOptions);
      }),
      catchError((error) => throwError(() => error)),
    );
  }

  public cancelOrder(orderId: number): Observable<object> {
    return this.http
      .delete(ApiEndpoint.Order + `/${orderId}`, httpOptions)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
