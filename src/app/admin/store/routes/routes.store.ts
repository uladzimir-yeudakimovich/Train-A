import { RailRoute } from '@admin/models/route.model';
import { AdminService } from '@admin/services/admin/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';

import { routeConfig } from './routes.config';

export const RouteStore = signalStore(
  { providedIn: 'root' },
  withEntities(routeConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getRoutes() {
      if (!store.routesIds().length) {
        const routes = await adminService.loadRoutes();
        patchState(store, setAllEntities(routes, routeConfig));
      }
    },

    async postRoute(route: Partial<RailRoute>) {
      const response = await adminService.postRoute(route);

      if ('id' in response) {
        const routeId = Number(response.id);
        const newRoute = {
          ...route,
          id: routeId,
        } as RailRoute;
        patchState(store, addEntity(newRoute, routeConfig));
      }
    },

    async updateRoute(id: number, route: Partial<RailRoute>) {
      await adminService.updateRoute(id, route);
      patchState(
        store,
        updateEntity(
          {
            id,
            changes: route,
          },
          routeConfig,
        ),
      );
    },

    async deleteRoute(id: number) {
      await adminService.deleteRoute(id);
      patchState(store, removeEntity(id, routeConfig));
    },
  })),
);
