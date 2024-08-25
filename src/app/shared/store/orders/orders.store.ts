import { AdminService } from '@admin/services/admin/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';

import { orderConfig } from './orders.config';

export const OrderStore = signalStore(
  { providedIn: 'root' },

  withEntities(orderConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async createOrder(
      rideId: number,
      seat: number,
      stationStart: number,
      stationEnd: number,
    ) {
      await adminService.postOrder(rideId, seat, stationStart, stationEnd);

      const orders = await adminService.loadOrders();
      patchState(store, setAllEntities(orders, orderConfig));
    },
  })),
);
