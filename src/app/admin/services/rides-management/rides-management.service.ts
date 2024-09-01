import {
  RideRoute,
  RouteInformation,
  SegmentUI,
} from '@admin/models/rides.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { mapRidesToUI, mapSegmentsToBE } from '@admin/utils/mapRides';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RidesManagementService {
  private stationsStore = inject(StationStore);

  constructor(private readonly http: HttpClient) {}

  getRouteInformation(routeId: number): Observable<RouteInformation> {
    return this.http.get<RideRoute>(`route/${routeId}`).pipe(
      switchMap((response) => {
        const carriages = [...new Set(response.carriages)];

        const stations = this.stationsStore
          .getStationsByIds()(response.path)
          .map((station) => station.city);

        const schedule = mapRidesToUI(response.schedule);

        return of({
          routeId: response.id,
          carriages,
          stations,
          schedule,
        });
      }),
      catchError((err) => throwError(() => err)),
    );
  }

  createRide(
    routeId: number,
    segments: SegmentUI[],
  ): Observable<{ id: number }> {
    const s = mapSegmentsToBE(segments);

    return this.http
      .post<{ id: number }>(`route/${routeId}/ride`, { segments: s })
      .pipe(catchError((err) => throwError(() => err)));
  }

  updateRide(
    routeId: number,
    rideId: number,
    segments: SegmentUI[],
  ): Observable<object> {
    const s = mapSegmentsToBE(segments);

    return this.http
      .put(`route/${routeId}/ride/${rideId}`, { segments: s })
      .pipe(catchError((err) => throwError(() => err)));
  }

  deleteRide(routeId: number, rideId: number): Observable<object> {
    return this.http
      .delete(`route/${routeId}/ride/${rideId}`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
