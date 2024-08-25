import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  computed,
  effect,
  inject,
  Injectable,
  Injector,
  Signal,
  signal,
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
  private carriageStore = inject(CarriageStore);

  private rideStore = inject(RideStore);

  private stationStore = inject(StationStore);

  private fromStation = signal<Station>({} as Station);

  private toStation = signal<Station>({} as Station);

  private rideSegments!: Signal<Segment[]>;

  private injector = inject(Injector);

  initStore(rideId: number, fromId: number, toId: number) {
    this.carriageStore.getCarriages();
    this.stationStore.getStations();
    this.rideStore.getRide(rideId);

    this.initRideEffect(rideId);
    this.initRideSegments(fromId, toId);
    this.initEdgeStationsEffect(fromId, toId);
    this.createTripCarriagesEffect();
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

      if (!carriages?.length) {
        return [];
      }

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

  getEdgeStationsInfo(): Signal<TripInfo> {
    return computed(() => {
      const rideSegments = this.rideSegments();

      if (!rideSegments?.length || !this.fromStation() || !this.toStation()) {
        return {
          rideId: 0,
          from: {} as Station,
          to: {} as Station,
          departure: '',
          arrival: '',
        };
      }

      return {
        rideId: this.ride().rideId,
        from: this.fromStation(),
        to: this.toStation(),
        departure: rideSegments[0].time[0],
        arrival: rideSegments.slice(-1)[0].time[1],
      };
    });
  }

  getAvailableSeatsMap(): Signal<Record<string, number>> {
    return computed(() => {
      const groupedCarriages = this.getGroupedCarriages();

      if (!groupedCarriages().length) {
        return {};
      }

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

  getPriceMap(): Signal<Record<string, number>> {
    return computed(() => {
      const carriages = this.carriages();
      const segments = this.rideSegments();

      if (!carriages?.length || !segments?.length) {
        return {};
      }
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
    });
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
              price: this.getPriceMap()()[carriage.name],
            });
          });
        });
      });

      return bookItems;
    });
  }

  getSeatScopes(): Record<string, { from: number; to: number }> {
    const carriages = this.carriages();

    if (!carriages?.length) {
      return {};
    }

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
    const rideSegments = this.rideSegments();
    const occupiedSeats = new Set<number>();
    rideSegments.forEach((segment) => {
      segment.occupiedSeats?.forEach((seat) => {
        occupiedSeats.add(seat);
      });
    });
    return Array.from(occupiedSeats.values());
  }

  private initRideEffect(rideId: number) {
    return effect(
      () => {
        const rideMap = this.rideStore.ridesEntityMap();
        if (!this.rideStore.ridesIds().length) {
          return;
        }
        untracked(() => {
          patchState(this, { ride: rideMap[rideId] });
        });
      },
      { injector: this.injector },
    );
  }

  private initRideSegments(fromId: number, toId: number) {
    this.rideSegments = computed(() => {
      const ride = this.ride();
      if (!ride?.rideId) {
        return [];
      }
      const schedule: Segment[] = [];
      const fromStationIdx = ride.path.indexOf(fromId);
      const toStationIdx = ride.path.indexOf(toId);
      for (let i = fromStationIdx; i < toStationIdx; i += 1) {
        schedule.push(ride.schedule.segments[i]);
      }
      return schedule;
    });
  }

  private initEdgeStationsEffect(fromId: number, toId: number) {
    return effect(
      () => {
        const stations = this.stationStore.stationsEntityMap();

        if (!this.stationStore.stationsIds().length) {
          return;
        }
        untracked(() => {
          this.fromStation.set(stations[fromId]);
          this.toStation.set(stations[toId]);
        });
      },
      { injector: this.injector },
    );
  }

  private createTripCarriagesEffect() {
    return effect(
      () => {
        const ride = this.ride();
        const carriageMap = this.carriageStore.carriagesEntityMap();

        if (!ride?.rideId || !this.carriageStore.carriagesIds().length) {
          return;
        }
        const tripCarriages: Carriage[] = [];
        for (let i = 0; i < ride.carriages.length; i += 1) {
          const carriage = carriageMap[ride.carriages[i]];
          tripCarriages.push({
            ...carriage,
            code: (i + 1).toString(),
          });
        }

        untracked(() => {
          patchState(this, { carriages: tripCarriages });
        });
      },
      { injector: this.injector },
    );
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
