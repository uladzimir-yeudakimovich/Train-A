import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
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

    getStatesWithSeats: (carriageCode: string) => {
      const carriage = store.getCarriage(carriageCode);
      const statesWithSeats = new Map<SeatState, number[]>();
      Object.values(SeatState).forEach((state) => statesWithSeats.set(state, []));

      carriage.seats.forEach((seat: CarSeat) => {
        statesWithSeats.get(seat.state)!.push(seat.number);
      });
      return statesWithSeats;
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

    // TODO: remove this method
    initState() {
      if (store.carriagesIds().length) return;
      const carriage = new Carriage('1', 'Carriage 1', 4, 2, 1);
      carriage.seats[2].state = SeatState.Reserved;
      carriage.seats[3].state = SeatState.Reserved;
      patchState(store, setEntity(carriage, carriageConfig));
    },
  })),
);
