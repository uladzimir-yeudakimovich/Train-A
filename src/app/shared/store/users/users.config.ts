import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

// TODO: temporary interface
export interface User {
  id: number;
  email: string;
}

export const userConfig = entityConfig({
  entity: type<User>(),
  collection: 'users',
  selectId: (user) => user.id,
});
