import { inject } from '@angular/core';
import { signalStore, withMethods } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { AdminService } from '@admin/services/admin/admin.service';
import { routeConfig } from './routes.config';

export const StationStore = signalStore(
  { providedIn: 'root' },
  withEntities(routeConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    // TODO
  })),
);
