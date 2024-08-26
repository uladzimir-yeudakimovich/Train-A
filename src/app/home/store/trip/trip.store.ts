import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  computed,
  effect,
  inject,
  Injectable,
  Injector,
  Signal,
  untracked,
} from '@angular/core';
import { BookItem, TripInfo } from '@home/models/trip.models';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Segment } from '@shared/models/interfaces/ride.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { RideStore } from '@shared/store/ride/ride.store';
import { getSeats } from '@shared/utils/carriage.utils';

import { initState } from './trip.config';

@Injectable({
  providedIn: 'root',
})
export class TripStore extends signalStore(
  { protectedState: false },
  withState(initState),
) {
  rideSegments: Segment[] = [];

  private fromStation: Station = {} as Station;

  private toStation: Station = {} as Station;

  private carriageStore = inject(CarriageStore);

  private rideStore = inject(RideStore);

  private stationStore = inject(StationStore);

  private injector = inject(Injector);

  async initStore(rideId: number, fromId: number, toId: number) {
    await this.rideStore.getRide(rideId);

    const ridesMap = this.rideStore.ridesEntityMap();
    if (!ridesMap[rideId]) {
      return;
    }
    await this.carriageStore.getCarriages();
    await this.stationStore.getStations();

    patchState(this, { ride: ridesMap[rideId] });

    this.initRideSegments(fromId, toId);
    this.initEdgeStations(fromId, toId);
    this.createTripCarriages();
    this.initTripCarriages();
  }

  selectedToReserved() {
    const carriages = this.carriages();
    const updatedCarriages = carriages.map((carriage) => {
      const updatedSeats = carriage.seats.map((seat) => {
        if (seat.state === SeatState.Selected) {
          return { ...seat, state: SeatState.Reserved };
        }
        return seat;
      });
      return { ...carriage, seats: updatedSeats };
    });
    patchState(this, { carriages: updatedCarriages });
  }

  toggleSeatState(carCode: string, seatNumber: number) {
    const carriages = this.carriages();
    const carriage = carriages.find((c) => c.code === carCode)!;
    const seat = carriage.seats.find((s) => s.number === seatNumber);
    if (seat) {
      seat.state =
        seat.state === SeatState.Available
          ? SeatState.Selected
          : SeatState.Available;
      patchState(this, { carriages: [...carriages] });
    }
  }

  getGroupedCarriages(): Signal<{ type: string; carriages: Carriage[] }[]> {
    return computed(() => {
      const carriages = this.carriages();
      const typesWithCars: { type: string; carriages: Carriage[] }[] = [];

      carriages.forEach((carriage) => {
        const type = carriage.name;
        const existing = typesWithCars.find((r) => r.type === type);

        if (existing) {
          existing.carriages.push(carriage);
        } else {
          typesWithCars.push({ type, carriages: [carriage] });
        }
      });

      return typesWithCars;
    });
  }

  getEdgeStationsInfo(): TripInfo {
    return {
      rideId: this.ride().rideId,
      from: this.fromStation,
      to: this.toStation,
      departure: this.rideSegments[0].time[0],
      arrival: this.rideSegments.slice(-1)[0].time[1],
    };
  }

  getAvailableSeatsMap(): Signal<Record<string, number>> {
    return computed(() => {
      const groupedCarriages = this.getGroupedCarriages();
      const availableSeats: Record<string, number> = {};

      groupedCarriages().forEach((typeWithCars) => {
        const availableSeatsInCarriage = typeWithCars.carriages.reduce(
          (acc, carriage) => {
            return (
              acc +
              carriage.seats.filter((s) => s.state !== SeatState.Reserved)
                .length
            );
          },
          0,
        );
        availableSeats[typeWithCars.type] = availableSeatsInCarriage;
      });

      return availableSeats;
    });
  }

  getPriceMap(): Record<string, number> {
    const carriages = this.carriages();
    const segments = this.rideSegments;

    const priceMap: Record<string, number> = {};
    // carriage name -> price (sum of all segments)
    carriages.forEach((carriage) => {
      if (priceMap[carriage.name]) {
        return;
      }
      const totalPrice = segments.reduce((acc, s) => {
        const priceInSegment = s.price[carriage.name];
        return acc + priceInSegment;
      }, 0);
      priceMap[carriage.name] = totalPrice;
    });

    return priceMap;
  }

  getBookItems(): Signal<BookItem[]> {
    return computed(() => {
      const carTypes = this.getGroupedCarriages();
      const bookItems: BookItem[] = [];

      carTypes().forEach((carType) => {
        carType.carriages.forEach((carriage) => {
          const selectedSeats = carriage.seats.filter(
            (s) => s.state === SeatState.Selected,
          );
          selectedSeats.forEach((seat) => {
            bookItems.push({
              carId: carriage.code,
              seatNumber: seat.number,
              price: this.getPriceMap()[carriage.name],
            });
          });
        });
      });

      return bookItems;
    });
  }

  getSeatScopes(): Record<string, { from: number; to: number }> {
    const carriages = this.carriages();
    const seatScopes: Record<string, { from: number; to: number }> = {};

    let fromSeat = 1;
    carriages.forEach((carriage) => {
      const toSeat = fromSeat + carriage.seats.length - 1;
      seatScopes[carriage.code] = { from: fromSeat, to: toSeat };
      fromSeat = toSeat + 1;
    });

    return seatScopes;
  }

  private getOccupiedSeats(): number[] {
    const occupiedSeats = new Set<number>();
    this.rideSegments.forEach((segment) => {
      segment.occupiedSeats?.forEach((seat) => {
        occupiedSeats.add(seat);
      });
    });
    return Array.from(occupiedSeats.values());
  }

  private initRideSegments(fromId: number, toId: number) {
    const ride = this.ride();

    const schedule: Segment[] = [];
    const fromStationIdx = ride.path.indexOf(fromId);
    const toStationIdx = ride.path.indexOf(toId);
    for (let i = fromStationIdx; i < toStationIdx; i += 1) {
      schedule.push(ride.schedule.segments[i]);
    }
    this.rideSegments = schedule;
  }

  private initEdgeStations(fromId: number, toId: number) {
    const stations = this.stationStore.stationsEntityMap();
    this.fromStation = stations[fromId];
    this.toStation = stations[toId];
  }

  private createTripCarriages() {
    const ride = this.ride();
    const carriageMap = this.carriageStore.carriagesEntityMap();
    const tripCarriages: Carriage[] = [];
    for (let i = 0; i < ride.carriages.length; i += 1) {
      const carriage = carriageMap[ride.carriages[i]];
      tripCarriages.push({
        ...carriage,
        code: (i + 1).toString(),
      });
    }
    patchState(this, { carriages: tripCarriages });
  }

  private initTripCarriages() {
    const addOccupiedSeatsEffectRef = effect(
      () => {
        const tripCarriages = this.carriages();
        const occupiedSeats = this.getOccupiedSeats();
        const seatScopes = this.getSeatScopes();

        if (!tripCarriages?.length || JSON.stringify(seatScopes) === '{}') {
          return;
        }

        const carriagesWithOccupiedSeats = tripCarriages.map((carriage) => {
          const { from, to } = seatScopes[carriage.code];
          const occupiedSeatsInCarriage = occupiedSeats
            .filter((s) => s >= from && s <= to)
            .map((s) => s - from + 1);
          return {
            ...carriage,
            seats: getSeats(carriage, occupiedSeatsInCarriage),
          };
        });

        untracked(() => {
          patchState(this, { carriages: carriagesWithOccupiedSeats });
        });
        addOccupiedSeatsEffectRef.destroy();
      },
      { injector: this.injector, manualCleanup: true },
    );
  }
}
