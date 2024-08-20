import { RailRoute } from '@admin/models/route.model';
import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

export const routeConfig = entityConfig({
  entity: type<RailRoute>(),
  collection: 'routes',
  selectId: (route) => route.id,
});
