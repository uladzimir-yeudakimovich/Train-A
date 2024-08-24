import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { computed, effect, inject, Injectable, Signal } from '@angular/core';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Segment } from '@shared/models/interfaces/ride.model';
import { CarriageStore } from '@shared/store/carriage/carriages.store';
import { RideStore } from '@shared/store/ride/ride.store';
import { getSeats } from '@shared/utils/carriage.utils';

import { initState } from './trip.config';

@Injectable()
export class TripStore extends signalStore(
  { protectedState: false },
  withState(initState),
) {
  private carriageStore = inject(CarriageStore);

  private rideStore = inject(RideStore);

  private stationStore = inject(StationStore);

  private fromStation: Station = {} as Station;

  private toStation: Station = {} as Station;

  private rideSegments!: Signal<Segment[]>;

  constructor() {
    super();
    // TODO: remove from constructor?
    this.carriageStore.getCarriages();
    this.stationStore.getStations();
  }

  initStore(rideId: number, fromId: number, toId: number) {
    this.rideStore.getRide(rideId);

    this.rideSegments = computed(() => {
      const ride = this.ride();
      const schedule: Segment[] = [];
      const fromStationIdx = ride.path.indexOf(fromId);
      const toStationIdx = ride.path.indexOf(toId);

      for (let i = fromStationIdx; i < toStationIdx; i += 1) {
        schedule.push(ride.schedule[i]);
      }
      return schedule;
    });

    effect(() => {
      const stations = this.stationStore.stationsEntityMap();
      this.fromStation = stations[fromId];
      this.toStation = stations[toId];
    });

    effect(() => {
      const rideMap = this.rideStore.ridesEntityMap();

      if (rideMap) {
        patchState(this, { ride: rideMap[rideId] });
      }
    });

    effect(() => {
      const ride = this.ride();
      const carriageMap = this.carriageStore.carriagesEntityMap();
      const tripCarriages = ride.carriages.map((c) => {
        return { ...carriageMap[c] };
      });

      patchState(this, { carriages: tripCarriages });
    });

    effect(() => {
      const tripCarriages = this.carriages();
      const occupiedSeats = this.getOccupiedSeats();
      const seatScopeMap = this.getSeatScopeMap();

      tripCarriages.map((carriage) => {
        const { from, to } = seatScopeMap[carriage.code];
        const occupiedSeatsInCarriage = occupiedSeats
          .filter((s) => s >= from && s <= to)
          .map((s) => s - from + 1);

        return {
          ...carriage,
          seats: getSeats(carriage, occupiedSeatsInCarriage),
        };
      });
      patchState(this, { carriages: tripCarriages });
    });
  }

  toggleSeatState(carIdx: number, seatNumber: number) {
    const carriages = this.carriages();
    const carriage = carriages[carIdx];
    const seat = carriage.seats.find((s) => s.number === seatNumber);

    if (seat) {
      seat.state =
        seat.state === SeatState.Available
          ? SeatState.Selected
          : SeatState.Available;
      patchState(this, { carriages });
    }
  }

  getCarriageTypeMap(): Signal<{ type: string; carriages: Carriage[] }[]> {
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

  getEdgeStationsInfo(): Signal<{
    from: Station;
    to: Station;
    departure: string;
    arrival: string;
  }> {
    return computed(() => {
      const rideSegments = this.rideSegments();
      return {
        from: this.fromStation,
        to: this.toStation,
        departure: rideSegments[0].time[0],
        arrival: rideSegments.slice(-1)[0].time[1],
      };
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

  private getSeatScopeMap(): Record<string, { from: number; to: number }> {
    const carriages = this.carriages();
    const seatScopeMap: Record<string, { from: number; to: number }> = {};

    let fromSeat = 1;
    carriages.forEach((carriage) => {
      const toSeat = fromSeat + carriage.seats.length - 1;
      seatScopeMap[carriage.code] = { from: fromSeat, to: toSeat };
      fromSeat = toSeat + 1;
    });

    return seatScopeMap;
  }
}
