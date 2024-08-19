import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { updateEntity, withEntities } from '@ngrx/signals/entities';
import { carriageConfig } from './carriages.config';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';
import { computed } from '@angular/core';

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
            changes: (carriage) => {
              const seat = carriage.seats.find((s) => s.number === updatedSeat.number)!;
              seat.state = updatedSeat.state;
              return carriage;
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
