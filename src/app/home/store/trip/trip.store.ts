import { StationStore } from '@admin/store/stations/stations.store';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { patchState, signalStore, withState } from '@ngrx/signals';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { RideStore } from '@shared/store/ride/ride.store';
import { getSeats } from '@shared/utils/carriage.utils';

import { initState } from './trip.config';

// TODO: do not use protectedState: false
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

  async initStore(rideId: number) {
    await this.rideStore.getRide(rideId);

    const ridesMap = this.rideStore.ridesEntityMap();
    if (!ridesMap[rideId]) {
      return;
    }
    await this.carriageStore.getCarriages();
    await this.stationStore.getStations();

    patchState(this, { ride: ridesMap[rideId] });

    this.createTripCarriages();
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

  initOccupiedSeats(occupiedSeats: number[]) {
    const tripCarriages = this.carriages();
    const seatScopes = this.getSeatScopes();

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

    patchState(this, { carriages: carriagesWithOccupiedSeats });
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
}
