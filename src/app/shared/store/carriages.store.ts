import { computed } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { updateEntity, withEntities } from '@ngrx/signals/entities';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';

import { carriageConfig } from './carriages.config';

export const CarriagesStore = signalStore(
  { providedIn: 'root' },

  withEntities(carriageConfig),

  withMethods((store) => ({
    getCarriage: (carriageCode: string) => store.carriagesEntityMap()[carriageCode] ?? null,
  })),

  withMethods((store) => ({
    getCarriageSignal: (carriageCode: string) => computed(() => store.getCarriage(carriageCode)),

    getSortedSeats: (carriageCode: string) => {
      const carriage = store.getCarriage(carriageCode);
      return [...carriage.seats].sort((a, b) => a.number - b.number);
    },

    getAvailableSeatsNumber: (carriageCode: string) => {
      const carriage = store.getCarriage(carriageCode);
      return carriage.seats.filter((s) => s.state !== SeatState.Reserved).length;
    },

    updateSeat: (carriage: Carriage, updatedSeat: CarSeat) => {
      patchState(
        store,
        updateEntity(
          {
            id: carriage.code,
            changes: (newCar) => {
              const seat = newCar.seats.find((s) => s.number === updatedSeat.number)!;
              seat.state = updatedSeat.state;
              return newCar;
            },
          },
          carriageConfig,
        ),
      );
    },

    updateCarriage: (updatedCarriage: Carriage) => {
      patchState(
        store,
        updateEntity(
          {
            id: updatedCarriage.code,
            changes: () => updatedCarriage,
          },
          carriageConfig,
        ),
      );
    },
  })),
);
