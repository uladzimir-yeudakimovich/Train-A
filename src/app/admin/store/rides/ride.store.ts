import { RouteInformation, Segment } from '@admin/models/rides.model';
import { RidesManagementService } from '@admin/services/rides-management/rides-management.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface RidesState extends RouteInformation {
  loading: boolean;
  error: null | { message: string; reason: string };
}

const initialState: RidesState = {
  routeId: 0,
  carriages: [],
  stations: [],
  schedule: [],
  loading: false,
  error: null,
};

export const RidesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, ridesService = inject(RidesManagementService)) => ({
    prepareStore(routeID: number) {
      patchState(store, { loading: true });

      ridesService.getRouteInformation(routeID).subscribe({
        next: (response) => {
          patchState(store, {
            routeId: response.routeId,
            carriages: response.carriages,
            stations: response.stations,
            schedule: response.schedule,
          });
        },
        error: (error) => {
          patchState(store, { loading: false, error });
        },
        complete: () => {
          patchState(store, { loading: false });
        },
      });
    },
    updateRide(rideId: number) {
      const ride = store.schedule().find((r) => r.rideId === rideId);
      if (ride) {
        ridesService
          .updateRide(store.routeId(), rideId, ride.segments)
          .subscribe({
            error(error) {
              patchState(store, { error });
            },
          });
      }
    },
    createRide(routeId: number, segments: Segment[]) {
      patchState(store, { loading: true });

      ridesService.createRide(routeId, segments).subscribe({
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
        error(error) {
          patchState(store, { loading: false, error });
        },
        complete: () => {
          patchState(store, { loading: false });
        },
      });
    },
  })),
);
