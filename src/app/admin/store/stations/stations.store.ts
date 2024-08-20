import { inject, Signal } from '@angular/core';
import { signalStore, patchState, withMethods } from '@ngrx/signals';
import { withEntities, setAllEntities, removeEntity } from '@ngrx/signals/entities';
import { AdminService } from '@admin/services/admin/admin.service';
import { stationConfig } from './stations.config';
import { Station } from '@admin/models/station.model';

export const StationStore = signalStore(
  { providedIn: 'root' },
  withEntities(stationConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getStations(): Promise<Signal<Station[]>> {
      if (!store.stationsIds.length) {
        const stations = await adminService.getStations();
        patchState(store, setAllEntities(stations, stationConfig));
      }
      return store.stationsEntities;
    },

    async deleteStation(id: number): Promise<void> {
      await adminService.deleteStation(id);
      patchState(store, removeEntity(id, stationConfig));
    },
  })),
);

