import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarSeatComponent } from '@shared/components/car-seat/car-seat.component';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';
import { Ride } from '@shared/models/interfaces/ride.model';
import { CarriageStore } from '@shared/store/carriage/carriages.store';
import { RideStore } from '@shared/store/ride/ride.store';
import { getSeats } from '@shared/utils/carriage.utils';

import { BookModalComponent } from './components/book-modal/book-modal.component';
import { CarriageListComponent } from './components/carriage-list/carriage-list.component';

// TODO: refactor this bullshit
@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    JsonPipe,
    CarSeatComponent,
    DatePipe,
    CarriageListComponent,
    MatTabsModule,
    BookModalComponent,
    MatIcon,
    MatListItem,
    CurrencyPipe,
  ],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  ride!: Signal<Ride>;

  rideStore = inject(RideStore);

  stationStore = inject(StationStore);

  carriageStore = inject(CarriageStore);

  tripInfo!: Signal<{
    from: Station;
    to: Station;
    dateFrom: string;
    dateTo: string;
  }>;

  carTypes!: Signal<{ type: string; carriages: Carriage[] }[]>;

  bookItems = computed(() => {
    const carTypes = this.carTypes();
    const bookItems: {
      carId: string;
      seatNumber: number;
      price: number;
    }[] = [];
    carTypes.forEach((carType) => {
      carType.carriages.forEach((carriage) => {
        const selectedSeats = carriage.seats.filter(
          (s) => s.state === SeatState.Selected,
        );
        selectedSeats.forEach((seat) => {
          bookItems.push({
            carId: carriage.code,
            seatNumber: seat.number,
            price: this.getPrice(carType.type),
          });
        });
      });
    });
    return bookItems;
  });

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

    const filteredCarriages = computed(() => {
      const storeCarriages = this.carriageStore.carriagesEntityMap();
      const ride = this.ride();

      if (!ride?.rideId) {
        return [];
      }
      const occupiedSeats = new Set<number>();
      ride.schedule.forEach((segment) => {
        segment.occuppiedSeats.forEach((seat) => {
          occupiedSeats.add(seat);
        });
      });
      // return storeCarriages.filter((c) => ride.carriages.includes(c.code));
      const result: Carriage[] = [];
      ride.carriages.forEach((carriageCode) => {
        const carriage = storeCarriages[carriageCode];
        if (!carriage) {
          return;
        }
        const { fromSeat, toSeat } = this.getSeatNumbers(result, carriage);
        const occupiedSeatsInCarriage = Array.from(occupiedSeats.values())
          .filter((s) => s >= fromSeat && s <= toSeat)
          .map((s) => s - fromSeat + 1);
        const carriageWithOccupiedSeats = {
          ...carriage,
          seats: getSeats(carriage, occupiedSeatsInCarriage),
        };
        result.push(carriageWithOccupiedSeats);
      });
      return result;
    });

    this.carTypes = computed(() => {
      const carriages = filteredCarriages();
      const result: { type: string; carriages: Carriage[] }[] = [];
      carriages.forEach((carriage) => {
        const type = carriage.name;
        const existing = result.find((r) => r.type === type);
        // TODO: add occupied seats (concat all occupiedSeats from all segments)
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

      if (!this.ride()?.rideId) {
        return { from, to, dateFrom: '', dateTo: '' };
      }

      const schedules = this.ride().schedule;
      const dateFrom = schedules[0].time[0];
      const dateTo = schedules[schedules.length - 1].time[1];
      return { from, to, dateFrom, dateTo };
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

  getAvailableSeatsNumber(carriages: Carriage[]): number {
    return carriages.reduce((acc, c) => {
      return acc + c.seats.filter((s) => s.state !== SeatState.Reserved).length;
    }, 0);
  }

  getPrice(carriageType: string): number {
    const ride = this.ride();
    const totalPrice = ride.schedule.reduce((acc, s) => {
      const priceInSegment = s.price[carriageType];
      return acc + priceInSegment;
    }, 0);
    return totalPrice;
  }

  private getSeatNumbers(
    carriages: Carriage[],
    car: Carriage,
  ): { fromSeat: number; toSeat: number } {
    let totalSeats = 0;
    carriages.forEach((c) => {
      totalSeats += c.seats.length;
    });
    const seatsInCarriage = car.seats.length;
    return { fromSeat: totalSeats + 1, toSeat: totalSeats + seatsInCarriage };
  }
}
