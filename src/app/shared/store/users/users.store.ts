import { signalStore, withMethods } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { User, userConfig } from './users.config';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withEntities(userConfig),

  withMethods((store) => ({
    // TODO: load all users
    getCurrentUser(): User | undefined {
      const email = localStorage.getItem('username');
      return store.usersEntities().find((user) => user.email === email);
    },
  })),
);
