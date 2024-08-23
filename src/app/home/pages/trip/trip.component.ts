import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { DatePipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarSeatComponent } from '@shared/components/car-seat/car-seat.component';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';
import { Ride } from '@shared/models/interfaces/ride.model';
import { CarriageStore } from '@shared/store/carriage/carriages.store';
import { RideStore } from '@shared/store/ride/ride.store';

import { CarriageListComponent } from './components/carriage-list/carriage-list.component';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    JsonPipe,
    CarSeatComponent,
    DatePipe,
    CarriageListComponent,
    MatTabsModule,
  ],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  ride!: Signal<Ride>;

  rideStore = inject(RideStore);

  stationStore = inject(StationStore);

  carriageStore = inject(CarriageStore);

  tripInfo!: Signal<{ from: Station; to: Station; date: string }>;

  carTypes!: Signal<{ type: string; carriages: Carriage[] }[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // /trip/:rideId?from=stationId&to=stationId
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');

    const fromStationId =
      this.activatedRoute.snapshot.queryParamMap.get('from');
    const toStationId = this.activatedRoute.snapshot.queryParamMap.get('to');

    if (!(rideId && fromStationId && toStationId)) {
      this.router.navigate([RoutePath.NotFound]);
    }
    this.stationStore.getStations();
    this.carriageStore.getCarriages();
    this.initTripInfo(Number(fromStationId), Number(toStationId));

    this.rideStore.getRide(Number(rideId));
    this.ride = computed(() => this.rideStore.ridesEntityMap()[Number(rideId)]);

    const folteredCarriages = computed(() => {
      const storeCarriages = this.carriageStore.carriagesEntities();
      const ride = this.ride();
      return storeCarriages.filter((c) => ride.carriages.includes(c.code));
    });

    this.carTypes = computed(() => {
      const carriages = folteredCarriages();
      const result: { type: string; carriages: Carriage[] }[] = [];
      carriages.forEach((carriage) => {
        const type = carriage.name;
        const existing = result.find((r) => r.type === type);
        // TODO: add occupied seats
        if (existing) {
          existing.carriages.push(carriage);
        } else {
          result.push({ type, carriages: [carriage] });
        }
      });
      return result;
    });
  }

  private initTripInfo(fromStationId: number, toStationId: number): void {
    this.tripInfo = computed(() => {
      const stations = this.stationStore.stationsEntityMap();
      const from = stations[fromStationId];
      const to = stations[toStationId];
      const date = this.ride()?.schedule[0].time[0];
      return { from, to, date };
    });
  }

  get legendSeats(): { description: string; seat: CarSeat }[] {
    return [
      {
        description: 'Reserved seat',
        seat: { number: 1, state: SeatState.Reserved },
      },
      {
        description: 'Avilable seat',
        seat: { number: 1, state: SeatState.Available },
      },
      {
        description: 'Selected seat',
        seat: { number: 1, state: SeatState.Selected },
      },
    ];
  }
}
