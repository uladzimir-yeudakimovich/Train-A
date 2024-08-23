import { StationResponseItem } from '@admin/models/station.model';
import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

export const stationConfig = entityConfig({
  entity: type<StationResponseItem>(),
  collection: 'stations',
  selectId: (station) => station.id,
});
