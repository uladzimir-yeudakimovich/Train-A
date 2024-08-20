import { inject } from '@angular/core';
import { signalStore, patchState, withMethods } from '@ngrx/signals';
import { withEntities, setAllEntities, removeEntity } from '@ngrx/signals/entities';
import { AdminService } from '@admin/services/admin/admin.service';
import { stationConfig } from './stations.config';

export const StationStore = signalStore(
  { providedIn: 'root' },
  withEntities(stationConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getStations(): Promise<void> {
      const stations = await adminService.getStations();
      patchState(store, setAllEntities(stations, stationConfig));
    },

    async deleteStation(id: number): Promise<void> {
      await adminService.deleteStation(id);
      patchState(store, removeEntity(id, stationConfig));
    },
  })),
);

