import { Route, RouteInformation, Station } from '@admin/interfaces';
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
    return this.http.get<Station[]>('station').pipe(
      switchMap((stationResponse) => {
        return this.http.get<Route>(`route/${routeId}`).pipe(
          switchMap((routeResponse) => {
            const stationIndices = stationResponse.filter((station) =>
              routeResponse.path.includes(station.id),
            );
            const stations = stationIndices.map((station) => station.city);
            return of({ routeId: routeResponse.id, schedule: routeResponse.schedule, stations });
          }),
        );
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  createRide() {}

  updateRide() {}
}
