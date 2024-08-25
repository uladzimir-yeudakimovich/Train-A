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

  constructor() {
    super();
    // TODO: remove from constructor?
    this.carriageStore.getCarriages();
    this.stationStore.getStations();
  }

  private injector = inject(Injector);

  initStore(rideId: number, fromId: number, toId: number) {
    this.rideStore.getRide(rideId);

    effect(
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

    this.rideSegments = computed(() => {
      const ride = this.ride();
      if (!ride?.rideId) {
        return [];
      }
      const schedule: Segment[] = [];
      const fromStationIdx = ride.path.indexOf(fromId);
      const toStationIdx = ride.path.indexOf(toId);
      for (let i = fromStationIdx; i < toStationIdx; i += 1) {
        schedule.push(ride.schedule[i]);
      }
      return schedule;
    });

    effect(
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

    effect(
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

    effect(
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

    const addOccupiedSeatsEffectRef = effect(
      () => {
        const tripCarriages = this.carriages();
        const occupiedSeats = this.getOccupiedSeats();
        const seatScopes = this.getSeatScopes();

        if (
          !tripCarriages?.length ||
          !occupiedSeats?.length ||
          !seatScopes?.length
        ) {
          return;
        }

        const carriagesWithOccupiedSeats = tripCarriages.map((carriage) => {
          const carIdx = tripCarriages.indexOf(carriage);
          const { from, to } = seatScopes[carIdx];
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

  getCarriageTypeMap(): Signal<{ type: string; carriages: Carriage[] }[]> {
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

  getEdgeStationsInfo(): Signal<{
    from: Station;
    to: Station;
    departure: string;
    arrival: string;
  }> {
    return computed(() => {
      const rideSegments = this.rideSegments();

      if (!rideSegments?.length || !this.fromStation() || !this.toStation()) {
        return {
          from: this.fromStation(),
          to: this.toStation(),
          departure: '',
          arrival: '',
        };
      }

      return {
        from: this.fromStation(),
        to: this.toStation(),
        departure: rideSegments[0].time[0],
        arrival: rideSegments.slice(-1)[0].time[1],
      };
    });
  }

  getAvailableSeatsMap(): Signal<Record<string, number>> {
    return computed(() => {
      const carriagesMap = this.getCarriageTypeMap();

      if (!carriagesMap().length) {
        return {};
      }

      const availableSeats: Record<string, number> = {};

      carriagesMap().forEach((typeWithCars) => {
        const availableSeatsInCarriage = typeWithCars.carriages.reduce(
          (acc, carriage) => {
            return (
              acc +
              carriage.seats.filter((s) => s.state === SeatState.Available)
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

  getBookItems(): Signal<
    {
      carId: string;
      seatNumber: number;
      price: number;
    }[]
    // eslint-disable-next-line
    > {
    return computed(() => {
      const carTypes = this.getCarriageTypeMap();
      const bookItems: {
        carId: string;
        seatNumber: number;
        price: number;
      }[] = [];

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

  private getOccupiedSeats(): number[] {
    const rideSegments = this.rideSegments();
    const occupiedSeats = new Set<number>();

    rideSegments.forEach((segment) => {
      segment.occuppiedSeats.forEach((seat) => {
        occupiedSeats.add(seat);
      });
    });
    return Array.from(occupiedSeats.values());
  }

  private getSeatScopes(): { from: number; to: number }[] {
    const carriages = this.carriages();

    if (!carriages?.length) {
      return [];
    }

    const seatScopes: { from: number; to: number }[] = [];

    let fromSeat = 1;
    carriages.forEach((carriage) => {
      const toSeat = fromSeat + carriage.seats.length - 1;
      const carIdx = carriages.indexOf(carriage);
      seatScopes[carIdx] = { from: fromSeat, to: toSeat };
      fromSeat = toSeat + 1;
    });

    return seatScopes;
  }
}
