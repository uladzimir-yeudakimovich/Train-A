import { inject, Injectable } from '@angular/core';
import { OrderStore } from '@shared/store/orders/orders.store';
import { UserStore } from '@shared/store/users/users.store';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderStore = inject(OrderStore);

  userStore = inject(UserStore);

  async initStore() {
    const isManager = localStorage.getItem('role') === 'manager';
    await this.orderStore.getOrders();
    if (isManager) {
      await this.userStore.getUsers();
    }
  }
}
