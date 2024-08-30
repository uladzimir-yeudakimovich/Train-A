import { StationStore } from '@admin/store/stations/stations.store';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { RideStore } from '@shared/store/ride/ride.store';
import { getSeats } from '@shared/utils/carriage.utils';
import {
  getAvailableSeatsNumberMap,
  getCarriageTypeMap,
  getSeatScopes,
} from '@shared/utils/ride.utils';

import { initState } from './trip.config';

export const TripStore = signalStore(
  { providedIn: 'root' },
  withState(initState),

  withComputed(({ carriages }) => ({
    availableSeatsMap: computed(() => getAvailableSeatsNumberMap(carriages())),

    seatScopes: computed(() => getSeatScopes(carriages())),

    carriagesByTypeMap: computed(() => getCarriageTypeMap(carriages())),
  })),

  withMethods(
    (
      store,
      carriageStore = inject(CarriageStore),
      rideStore = inject(RideStore),
      stationStore = inject(StationStore),
    ) => ({
      async initStore(rideId: number) {
        await rideStore.getRide(rideId);

        const ridesMap = rideStore.ridesEntityMap();
        if (!ridesMap[rideId]) {
          return;
        }
        await carriageStore.getCarriages();
        await stationStore.getStations();

        patchState(store, { ride: ridesMap[rideId] });

        this.createTripCarriages();
      },

      selectedToReserved() {
        const carriages = store.carriages();
        const updatedCarriages = carriages.map((carriage) => {
          const updatedSeats = carriage.seats.map((seat) => {
            if (seat.state === SeatState.Selected) {
              return { ...seat, state: SeatState.Reserved };
            }
            return seat;
          });
          return { ...carriage, seats: updatedSeats };
        });
        patchState(store, { carriages: updatedCarriages });
      },

      toggleSeatState(carCode: string, seatNumber: number) {
        const carriages = store.carriages();
        const carriage = carriages.find((c) => c.code === carCode)!;
        const seat = carriage.seats.find((s) => s.number === seatNumber);
        if (seat) {
          seat.state =
            seat.state === SeatState.Available
              ? SeatState.Selected
              : SeatState.Available;
          patchState(store, { carriages: [...carriages] });
        }
      },

      initOccupiedSeats(occupiedSeats: number[]) {
        const tripCarriages = store.carriages();
        const seatScopes = store.seatScopes();

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

        patchState(store, { carriages: carriagesWithOccupiedSeats });
      },

      createTripCarriages() {
        const ride = store.ride();
        const carriageMap = carriageStore.carriagesEntityMap();
        const tripCarriages: Carriage[] = [];
        for (let i = 0; i < ride.carriages.length; i += 1) {
          const carriage = carriageMap[ride.carriages[i]];
          tripCarriages.push({
            ...carriage,
            code: (i + 1).toString(),
          });
        }
        patchState(store, { carriages: tripCarriages });
      },
    }),
  ),
);
