import { Route, RouteInformation, Segment, Station } from '@admin/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private readonly http: HttpClient) {}

  getRouteInformation(routeId: number): Observable<RouteInformation> {
    // TODO: Temporary implementation
    return this.getStations().pipe(
      switchMap((stationResponse) => {
        return this.http.get<Route>(`route/${routeId}`).pipe(
          switchMap((routeResponse) => {
            const carriageTypes = [...new Set(routeResponse.carriages)];

            const stationIndices = stationResponse.filter((station) =>
              routeResponse.path.includes(station.id),
            );
            const stations = stationIndices.map((station) => station.city);

            return of({
              routeId: routeResponse.id,
              carriages: carriageTypes,
              schedule: routeResponse.schedule,
              stations,
            });
          }),
        );
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  // TODO: Temporary method
  getStations(): Observable<Station[]> {
    return this.http
      .get<Station[]>('station')
      .pipe(catchError((err) => throwError(() => err)));
  }

  // createRide() {}

  updateRide(
    routeId: number,
    rideId: number,
    segments: Segment[],
  ): Observable<object> {
    return this.http
      .put(`route/${routeId}/ride/${rideId}`, { segments })
      .pipe(catchError((err) => throwError(() => err)));
  }
}
