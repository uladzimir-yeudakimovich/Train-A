import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Ride } from '@shared/models/interfaces/ride.model';

export interface TripState {
  ride: Ride;
  carriages: Carriage[];
}

export const initState: TripState = {
  ride: {
    rideId: 0,
    path: [],
    carriages: [],
    schedule: [],
  },
  carriages: [],
};
