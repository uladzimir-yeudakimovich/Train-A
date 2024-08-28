import {
  RideRoute,
  RouteInformation,
  Segment,
} from '@admin/models/rides.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { RouteManagementService } from '../route-management/route-management.service';

@Injectable({
  providedIn: 'root',
})
export class RidesManagementService {
  constructor(
    private readonly http: HttpClient,
    private readonly routeService: RouteManagementService,
  ) {}

  getRouteInformation(routeId: number): Observable<RouteInformation> {
    return this.http.get<RideRoute>(`route/${routeId}`).pipe(
      switchMap((response) => {
        const carriages = [...new Set(response.carriages)];

        const stations = this.routeService.getStationCities(response.path);

        return of({
          routeId: response.id,
          carriages,
          stations,
          schedule: response.schedule,
        });
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  createRide(routeId: number, segments: Segment[]): Observable<{ id: number }> {
    return this.http
      .post<{ id: number }>(`route/${routeId}/ride`, { segments })
      .pipe(catchError((err) => throwError(() => err)));
  }

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
