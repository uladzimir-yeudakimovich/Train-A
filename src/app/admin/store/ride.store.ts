import { RouteInformation } from '@admin/interfaces';
import { AdminService } from '@admin/services/admin.service';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withState } from '@ngrx/signals';

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
  withComputed((state) => ({
    rides: computed(() => state.schedule().map((ride) => ride)),
  })),
  withHooks({
    onInit(store) {
      const adminService = inject(AdminService);

      patchState(store, { loading: true });

      // TODO: Temporary implementation
      const ROUTE_ID = 1;

      adminService.getRouteInformation(ROUTE_ID).subscribe({
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
  }),
);
