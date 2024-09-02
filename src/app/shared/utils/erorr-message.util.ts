import { HttpErrorResponse } from '@angular/common/http';
import { ErrorReason } from '@shared/models/enums/api-path.enum';
import { Message } from '@shared/models/enums/messages.enum';

export function getErrorMessage(error: HttpErrorResponse): string {
  const { reason } = error.error;
  switch (reason) {
    case ErrorReason.AlreadyBooked:
      return Message.AlreadyBooked;
    case ErrorReason.InvalidAccessToken:
      return Message.InvalidAccessToken;
    case ErrorReason.InvalidStations:
      return Message.InvalidStations;
    case ErrorReason.InvalidRide:
      return Message.TripExpired;
    case ErrorReason.RideNotFound:
      return Message.RideNotFound;
    case ErrorReason.StationNotFound:
      return Message.StationNotFound;
    case ErrorReason.OrderNotFound:
      return Message.OrderNotFound;
    case ErrorReason.OrderNotActive:
      return Message.OrderNotActive;
    case ErrorReason.RecordInUse:
      return Message.DeleteStationWithActiveRides;
    case ErrorReason.InvalidData:
      return Message.RoutFormCannotChangeStation;
    case ErrorReason.RecordNotFound:
      return Message.RouteOrRideNotFound;
    default:
      return Message.UnexpectedError;
  }
}
