import { RouteInformation, Segment } from '@admin/interfaces';
import { AdminService } from '@admin/services/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface RidesState extends RouteInformation {
  loading: boolean;
}

const initialState: RidesState = {
  routeId: 0,
  carriages: [],
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
            carriages: response.carriages,
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
      const ride = store.schedule().find((r) => r.rideId === rideId);
      if (ride) {
        adminService
          .updateRide(store.routeId(), rideId, ride.segments)
          .subscribe();
      }
    },
    createRide(routeId: number, segments: Segment[]) {
      patchState(store, { loading: true });

      adminService.createRide(routeId, segments).subscribe({
        next(response) {
          const ride = { rideId: response.id, segments };

          patchState(store, (state) => {
            return {
              ...state,
              schedule: [ride, ...state.schedule],
              loading: false,
            };
          });
        },
        error() {
          patchState(store, { loading: false });
        },
        complete: () => {
          patchState(store, { loading: false });
        },
      });
    },
  })),
);
