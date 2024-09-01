import { AdminService } from '@admin/services/admin/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';

import { userConfig } from './users.config';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withEntities(userConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getUsers() {
      if (!store.usersEntities().length) {
        const users = await adminService.loadUsers();
        patchState(store, setAllEntities(users, userConfig));
      }
    },
  })),
);
