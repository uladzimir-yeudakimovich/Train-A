import { computed, inject } from '@angular/core';
import { signalStore, type, patchState, withMethods, withComputed } from '@ngrx/signals';
import { withEntities, setAllEntities, removeEntity, addEntity } from '@ngrx/signals/entities';
import { AdminService } from '@admin/services/admin.service';
import { StationInterface } from './../models/station.model';
import { StationFormInterface } from '@admin/models/station-form.model';

export const StationStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<StationInterface>(), collection: 'stations' }),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getStations(): Promise<void> {
      const stations = await adminService.getStations();
      patchState(store, setAllEntities(stations, { collection: 'stations' }));
    },

    async deleteStation(id: number): Promise<void> {
      await adminService.deleteStation(id);
      patchState(store, removeEntity(id, { collection: 'stations' }));
    },

    async addStation(body: StationFormInterface): Promise<void> {
      const station = await adminService.postStation(body);
      patchState(store, addEntity(station, { collection: 'stations' }));
    },
  })),

  withComputed(({ stationsEntities }) => ({
    locations: computed(() =>
      stationsEntities().map(({ city, latitude, longitude }) => ({
        location: [latitude, longitude],
        label: city,
      })),
    ),
  })),
);

export type StationStore = InstanceType<typeof StationStore>;