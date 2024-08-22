import { RouteInformation } from '@admin/interfaces';
import { AdminService } from '@admin/services/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface RidesState extends RouteInformation {
  loading: boolean;
}

const initialState: RidesState = {
  routeId: 0,
  stations: [],
  schedule: [],
  loading: false,
};

export const RidesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, adminService = inject(AdminService)) => ({
    prepareStore(routeID: number) {
      patchState(store, { loading: true });

      adminService.getRouteInformation(routeID).subscribe({
        next: (response) => {
          patchState(store, {
            routeId: response.routeId,
            stations: response.stations,
            schedule: response.schedule,
          });
        },
        error: () => {
          patchState(store, { loading: false });
        },
        complete: () => {
          patchState(store, { loading: false });
        },
      });
    },
    updateRide(rideId: number) {
      const ride = store.schedule().find((ride) => ride.rideId === rideId);
      if (ride) {
        adminService.updateRide(store.routeId(), rideId, ride.segments).subscribe();
      }
    },
  })),
);
