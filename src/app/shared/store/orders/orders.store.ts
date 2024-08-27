import { AdminService } from '@admin/services/admin/admin.service';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { OrderStatus } from '@shared/models/interfaces/order.model';

import { orderConfig } from './orders.config';

export const OrderStore = signalStore(
  { providedIn: 'root' },

  withEntities(orderConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getOrders() {
      const orders = await adminService.loadOrders();
      patchState(store, setAllEntities(orders, orderConfig));
    },

    async createOrder(
      rideId: number,
      seat: number,
      stationStart: number,
      stationEnd: number,
    ) {
      await adminService.postOrder(rideId, seat, stationStart, stationEnd);
      await this.getOrders();
    },

    async cancelOrder(orderId: number) {
      // TODO: handle errors
      const order = store.ordersEntityMap()[orderId];
      await adminService.cancelOrder(orderId);
      const cancelledOrder = { ...order, status: OrderStatus.Canceled };
      patchState(store, setEntity(cancelledOrder, orderConfig));
    },

    hasOrder(rideId: number): boolean {
      return !!store.ordersEntities().find((order) => order.rideId === rideId);
    },
  })),
);
