import { computed } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { carriageConfig } from './carriages.config';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';
import { computed, inject } from '@angular/core';
import { AdminService } from '@admin/services/admin/admin.service';

export const CarriageStore = signalStore(
  { providedIn: 'root' },

  withEntities(carriageConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    getCarriage: (carriageCode: string) => store.carriagesEntityMap()[carriageCode] ?? null,

    async getCarriages() {
      if (!store.carriagesIds().length) {
        const carriages = await adminService.loadCarriages();
        patchState(store, setAllEntities(carriages, carriageConfig));
      }
    },
  })),

  withMethods((store) => ({
    getCarriageSignal: (carriageCode: string) =>
      computed(() => store.getCarriage(carriageCode)),

    getSortedSeats: (carriageCode: string) => {
      const carriage = store.getCarriage(carriageCode);
      return [...carriage.seats].sort((a, b) => a.number - b.number);
    },

    getAvailableSeatsNumber: (carriageCode: string) => {
      const carriage = store.getCarriage(carriageCode);
      return carriage.seats.filter((s) => s.state !== SeatState.Reserved)
        .length;
    },

    updateSeat: (carriage: Carriage, updatedSeat: CarSeat) => {
      patchState(
        store,
        updateEntity(
          {
            id: carriage.code,
            changes: (newCar) => {
              const seat = newCar.seats.find(
                (s) => s.number === updatedSeat.number,
              )!;
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
