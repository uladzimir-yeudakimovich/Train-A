import { User } from '@auth/models/auth.model';
import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

export const userConfig = entityConfig({
  entity: type<User>(),
  collection: 'users',
  selectId: (user) => user.id,
});
