import { StationStore } from '@admin/store/stations/stations.store';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouteModalData, RouteStop } from '@home/models/trip.models';
import { RideStore } from '@shared/store/ride/ride.store';

import { routeModalImports } from './route-modal.config';
import { getDiffInMinutes } from './route-modal.utils';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: routeModalImports,
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RouteModalComponent>);

  readonly data = inject<RouteModalData>(MAT_DIALOG_DATA);

  isLoading = signal<boolean>(true);

  routeData = signal<RouteStop[]>([]);

  private rideStore = inject(RideStore);

  private stationStore = inject(StationStore);

  async ngOnInit() {
    this.isLoading.set(true);
    await this.rideStore.getRide(this.data.rideId);
    await this.stationStore.getStations();

    this.initRouteData();
    this.isLoading.set(false);
  }

  private initRouteData() {
    const ride = this.rideStore.ridesEntityMap()[this.data.rideId];
    const stationsMap = this.stationStore.stationsEntityMap();
    const stations = ride.path.map((stationId) => stationsMap[stationId]);
    const { segments } = ride.schedule;

    const routeStops: RouteStop[] = [];
    stations.forEach((station, idx) => {
      const arrival = idx > 0 ? segments[idx - 1].time[1] : '';
      const departure = idx < segments.length ? segments[idx].time[0] : '';
      const dwellTime = getDiffInMinutes(arrival, departure);

      routeStops.push({
        station,
        arrival,
        departure,
        dwellTime,
      });
    });

    this.routeData.set(routeStops);
  }
}
