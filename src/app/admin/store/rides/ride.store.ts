import { RouteInformation, SegmentUI } from '@admin/models/rides.model';
import { RidesManagementService } from '@admin/services/rides-management/rides-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ErrorReason } from '@shared/models/enums/api-path.enum';
import { Message } from '@shared/models/enums/messages.enum';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';

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
  withMethods(
    (
      store,
      ridesService = inject(RidesManagementService),
      snackBarService = inject(SnackBarService),
    ) => ({
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
            this.showError(error);
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
          ridesService
            .updateRide(store.routeId(), rideId, ride.segments)
            .subscribe({
              error: (error) => {
                this.showError(error);
              },
            });
        }
      },
      createRide(routeId: number, segments: SegmentUI[]) {
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
          error: (error) => {
            this.showError(error);
          },
          complete: () => {
            patchState(store, { loading: false });
          },
        });
      },
      deleteRide(rideId: number) {
        ridesService.deleteRide(store.routeId(), rideId).subscribe({
          next() {
            patchState(store, (state) => ({
              ...state,
              schedule: state.schedule.filter((ride) => ride.rideId !== rideId),
            }));
          },
          error: (error) => {
            this.showError(error);
          },
        });
      },
      showError(error: HttpErrorResponse) {
        switch (error.error.reason) {
          case ErrorReason.RecordNotFound:
            snackBarService.open(Message.RouteOrRideNotFound);
            break;
          case ErrorReason.RecordInUse:
            snackBarService.open(Message.RideIsAlreadyUsed);
            break;
          case ErrorReason.InvalidData:
            snackBarService.open(Message.TimeOrPriceIrrelevant);
            break;
          case ErrorReason.InvalidAccessToken:
            snackBarService.open(Message.InvalidAccessToken);
            break;
          default:
            snackBarService.open(Message.UnexpectedError);
            break;
        }
      },
    }),
  ),
);
