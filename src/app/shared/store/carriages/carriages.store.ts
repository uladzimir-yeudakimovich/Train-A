import { AdminService } from '@admin/services/admin/admin.service';
import { CarriageService } from '@admin/services/carriage-management/carriage.service';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  addEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';
import { getSeats } from '@shared/utils/carriage.utils';

import { carriageConfig } from './carriages.config';

export const CarriageStore = signalStore(
  { providedIn: 'root' },

  withEntities(carriageConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    getCarriage: (carriageCode: string) =>
      store.carriagesEntityMap()[carriageCode] ?? null,

    async getCarriages() {
      if (!store.carriagesIds().length) {
        const carriages = (await adminService.loadCarriages()).map((c) => {
          return {
            ...c,
            seats: getSeats(c),
          };
        });

        patchState(store, setAllEntities(carriages, carriageConfig));
      }
    },
  })),

  withMethods((store, carriageService = inject(CarriageService)) => ({
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

    async updateCarriage(carriage: Carriage) {
      const response = await carriageService.updateCarriage(carriage);
      if ('code' in response) {
        const newCarriage = {
          ...carriage,
          seats: getSeats(carriage as Carriage),
        };
        patchState(
          store,
          updateEntity(
            {
              id: carriage.code,
              changes: newCarriage,
            },
            carriageConfig,
          ),
        );
      }
    },

    async addCarriage(carriage: Carriage) {
      const response = await carriageService.addCarriage(carriage);
      if ('code' in response) {
        const { code } = response;
        const { name, leftSeats, rightSeats, rows } = carriage;
        const newCarriage = {
          code,
          name,
          leftSeats,
          rightSeats,
          rows,
          seats: getSeats(carriage as Carriage),
        } as Carriage;
        patchState(store, addEntity(newCarriage, carriageConfig));
      }
    },
  })),
);
