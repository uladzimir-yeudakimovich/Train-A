import { StationStore } from '@admin/store/stations/stations.store';
import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouteModalData, RouteStop } from '@home/models/trip.models';
import { RideStore } from '@shared/store/ride/ride.store';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDivider,
    MatIcon,
    DatePipe,
    MatProgressSpinner,
    JsonPipe,
  ],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RouteModalComponent>);

  readonly data = inject<RouteModalData>(MAT_DIALOG_DATA);

  isLoading = signal<boolean>(true);

  routeData = signal<RouteStop[]>([]);

  rideStore = inject(RideStore);

  stationStore = inject(StationStore);

  ngOnInit(): void {
    this.initRouteData();
  }

  async initRouteData() {
    this.isLoading.set(true);
    await this.rideStore.getRide(this.data.rideId);
    await this.stationStore.getStations();

    const ride = this.rideStore.ridesEntityMap()[this.data.rideId];
    const stationsMap = this.stationStore.stationsEntityMap();

    const stations = ride.path.map((stationId) => stationsMap[stationId]);
    const { segments } = ride.schedule;

    const routeStops: RouteStop[] = [];

    stations.forEach((station, idx) => {
      const arrivalTime = idx > 0 ? segments[idx - 1].time[1] : '';
      const departureTime = idx < segments.length ? segments[idx].time[0] : '';

      routeStops.push({
        city: station.city,
        arrival: arrivalTime,
        departure: departureTime,
        duration: this.getTimeDifference(arrivalTime, departureTime),
      });
    });

    this.routeData.set(routeStops);
    this.isLoading.set(false);
  }

  private getTimeDifference(
    isoTime1: string,
    isoTime2: string,
  ): number | undefined {
    if (!isoTime1 || !isoTime2) {
      return undefined;
    }
    const time1 = new Date(isoTime1);
    const time2 = new Date(isoTime2);
    const diff = time2.getTime() - time1.getTime();
    const minutes = Math.floor(diff / 60_000);
    return minutes;
  }
}
