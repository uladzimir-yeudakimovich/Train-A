import { Station } from '@admin/models/station.model';
import { AdminService } from '@admin/services/admin/admin.service';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  removeEntity,
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';

import { stationConfig } from './stations.config';

export const StationStore = signalStore(
  { providedIn: 'root' },
  withEntities(stationConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getStations() {
      if (!store.stationsIds().length) {
        const stations = await adminService.loadStations();
        patchState(store, setAllEntities(stations, stationConfig));
      }
    },

    async deleteStation(id: number): Promise<void> {
      await adminService.deleteStation(id);
      patchState(store, removeEntity(id, stationConfig));
    },

    async addStation(partialStation: Partial<Station>): Promise<void> {
      const station = await adminService.postStation(partialStation);
      patchState(store, setEntity(station, stationConfig));
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
