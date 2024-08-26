import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';
import { Ride } from '@shared/models/interfaces/ride.model';

export const rideConfig = entityConfig({
  entity: type<Ride>(),
  collection: 'rides',
  selectId: (ride) => ride.rideId,
});
