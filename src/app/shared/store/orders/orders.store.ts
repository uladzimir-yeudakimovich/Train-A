import { inject } from '@angular/core';
import { SearchService } from '@home/services/search/search.service';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  setAllEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Order, OrderStatus } from '@shared/models/interfaces/order.model';

import { orderConfig } from './orders.config';

export const OrderStore = signalStore(
  { providedIn: 'root' },

  withEntities(orderConfig),

  withMethods((store, searchService = inject(SearchService)) => ({
    async getOrders() {
      if (!store.ordersEntities().length) {
        this.loadActualOrders();
      }
    },

    async createOrder(
      rideId: number,
      seat: number,
      stationStart: number,
      stationEnd: number,
    ) {
      await searchService.postOrder(rideId, seat, stationStart, stationEnd);
      await this.loadActualOrders();
    },

    async cancelOrder(orderId: number) {
      const order = store.ordersEntityMap()[orderId];
      const cancelledOrder = { ...order, status: OrderStatus.Canceled };
      patchState(store, setEntity(cancelledOrder, orderConfig));
      await searchService.cancelOrder(orderId);
    },

    hasOrder(rideId: number): boolean {
      return !!store
        .ordersEntities()
        .find(
          (order) =>
            order.rideId === rideId && order.status === OrderStatus.Active,
        );
    },

    async loadActualOrders() {
      const orders = await searchService.loadOrders();
      patchState(store, setAllEntities(orders, orderConfig));
    },

    clear() {
      patchState(store, setAllEntities([] as Order[], orderConfig));
    },
  })),
);
