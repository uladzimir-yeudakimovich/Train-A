import { inject, Injectable } from '@angular/core';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { OrderStore } from '@shared/store/orders/orders.store';
import { UserStore } from '@shared/store/users/users.store';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderStore = inject(OrderStore);

  userStore = inject(UserStore);

  constructor(private adminGuard: AdminRoleGuard) {}

  async initStore() {
    const isManager = this.adminGuard.canActivate();
    await this.orderStore.getOrders();
    if (isManager) {
      await this.userStore.getUsers();
    }
  }
}
