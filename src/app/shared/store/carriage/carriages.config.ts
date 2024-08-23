import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';
import { Carriage } from '@shared/models/interfaces/carriage.model';

export const carriageConfig = entityConfig({
  entity: type<Carriage>(),
  collection: 'carriages',
  selectId: (carriage) => carriage.code,
});
