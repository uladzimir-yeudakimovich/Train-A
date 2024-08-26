import { type } from '@ngrx/signals';
import { entityConfig } from '@ngrx/signals/entities';
import { Order } from '@shared/models/interfaces/order.model';

export const orderConfig = entityConfig({
  entity: type<Order>(),
  collection: 'orders',
  selectId: (order) => order.id,
});
