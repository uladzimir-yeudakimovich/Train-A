import { Station } from '@admin/models/station.model';
import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

export const stationConfig = entityConfig({
  entity: type<Station>(),
  collection: 'stations',
  selectId: (station) => station.id,
});
