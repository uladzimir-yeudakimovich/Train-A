import { StationStore } from '@admin/store/stations/stations.store';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouteModalData, RouteStop } from '@home/models/trip.models';
import { RideStore } from '@shared/store/ride/ride.store';
import { getRouteStops } from '@shared/utils/ride.utils';

import { routeModalImports } from './route-modal.config';

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

  ngOnInit() {
    Promise.all([
      this.rideStore.getRide(this.data.rideId),
      this.stationStore.getStations(),
    ]).then(() => {
      this.initRouteData();
      this.isLoading.set(false);
    });
  }

  private initRouteData() {
    const ride = this.rideStore.ridesEntityMap()[this.data.rideId];
    const stationsMap = this.stationStore.stationsEntityMap();
    const stations = ride.path.map((stationId) => stationsMap[stationId]);
    const { segments } = ride.schedule;
    const routeStops: RouteStop[] = getRouteStops(stations, segments);

    this.routeData.set(routeStops);
  }
}
