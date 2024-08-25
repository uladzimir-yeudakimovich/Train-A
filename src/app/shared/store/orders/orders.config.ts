import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';

// TODO: remove/replace this temporary enum
export enum OrderStatus {
  Active = 'active',
}

// TODO: remove/replace this temporary interface
export interface Order {
  id: number;
  status: OrderStatus;
  path: number[];
}

export const orderConfig = entityConfig({
  entity: type<Order>(),
  collection: 'orders',
  selectId: (order) => order.id,
});
