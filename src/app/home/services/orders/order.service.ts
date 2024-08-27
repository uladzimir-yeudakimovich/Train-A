import { StationStore } from '@admin/store/stations/stations.store';
import { inject, Injectable } from '@angular/core';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { Order, OrderView } from '@shared/models/interfaces/order.model';
import { OrderStore } from '@shared/store/orders/orders.store';
import { UserStore } from '@shared/store/users/users.store';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderStore = inject(OrderStore);

  private userStore = inject(UserStore);

  private stationStore = inject(StationStore);

  constructor(private adminGuard: AdminRoleGuard) {}

  async initStore() {
    const isManager = this.adminGuard.canActivate();
    await this.orderStore.getOrders();
    await this.stationStore.getStations();
    if (isManager) {
      await this.userStore.getUsers();
    }
  }

  async getOrderViews(): Promise<OrderView[]> {
    // TODO: get starn and end station ids
    await this.initStore();
    const orders = this.orderStore.ordersEntities();
    const stationsMap = this.stationStore.stationsEntityMap();

    return orders.map((order) => {
      const startStation = stationsMap[order.path[0]].city;
      const startTime = order.schedule.segments[0].time[0];
      const endStation = stationsMap[order.path[order.path.length - 1]].city;
      const endTime =
        order.schedule.segments[order.schedule.segments.length - 1].time[1];
      const tripDuration = this.getTripDuration(order);
      const carType = this.getCarTyoe(order);
      const carNumber = this.getCarNumber(order);
      const price = this.getTripPrice(order);

      return {
        id: order.id,
        status: order.status,
        startStation,
        startTime,
        endStation,
        endTime,
        tripDuration,
        carType,
        carNumber,
        seatNumber: order.seatId,
        price,
      };
    });
  }

  private getTripDuration(order: Order) {
    const { segments } = order.schedule;
    const startTime = segments[0].time[0];
    const endTime = segments[segments.length - 1].time[1];
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end.getTime() - start.getTime();
    return new Date(diff).toISOString();
  }

  private getTripPrice(order: Order): number {
    // TODO
    return 0;
  }

  private getCarTyoe(order: Order): string {
    // TODO
    return '';
  }

  private getCarNumber(order: Order): number {
    // TODO
    return 0;
  }
}
