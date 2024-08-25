import { signalStore } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { orderConfig } from './orders.config';

export const OrderStore = signalStore(
  { providedIn: 'root' },

  withEntities(orderConfig),
);
