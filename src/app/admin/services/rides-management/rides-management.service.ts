import {
  RideRoute,
  RouteInformation,
  SegmentUI,
} from '@admin/models/rides.model';
import { mapRidesToUI, mapSegmentsToBE } from '@admin/utils/mapRides';
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

        const schedule = mapRidesToUI(response.schedule);

        return of({
          routeId: response.id,
          carriages,
          stations,
          schedule,
        });
      }),
      catchError((err) => throwError(() => err.error)),
    );
  }

  createRide(
    routeId: number,
    segments: SegmentUI[],
  ): Observable<{ id: number }> {
    const s = mapSegmentsToBE(segments);

    return this.http
      .post<{ id: number }>(`route/${routeId}/ride`, { segments: s })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updateRide(
    routeId: number,
    rideId: number,
    segments: SegmentUI[],
  ): Observable<object> {
    const s = mapSegmentsToBE(segments);

    return this.http
      .put(`route/${routeId}/ride/${rideId}`, { segments: s })
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
