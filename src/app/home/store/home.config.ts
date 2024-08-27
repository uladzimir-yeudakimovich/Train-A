import { SearchResponse } from '@home/models/search-response.model';
import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

export const homeConfig = entityConfig({
  entity: type<SearchResponse>(),
  collection: 'search',
  selectId: ({ from, to }) => `${from.stationId} => ${to.stationId}`,
});
