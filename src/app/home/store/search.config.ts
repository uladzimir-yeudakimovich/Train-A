import { SearchCard } from '@home/models/search-card.model';
import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

export const searchConfig = entityConfig({
  entity: type<SearchCard>(),
  collection: 'search',
  selectId: (ride) => ride.rideId,
});
