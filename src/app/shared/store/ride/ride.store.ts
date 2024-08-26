import { AdminService } from '@admin/services/admin/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';

import { rideConfig } from './ride.config';

export const RideStore = signalStore(
  { providedIn: 'root' },

  withEntities(rideConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getRide(id: number) {
      if (!store.ridesEntityMap()[id]) {
        const ride = await adminService.loadRide(id);
        patchState(store, setEntity(ride, rideConfig));
      }
    },
  })),
);
