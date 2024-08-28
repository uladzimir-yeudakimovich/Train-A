import { StationStore } from '@admin/store/stations/stations.store';
import { inject, Injectable } from '@angular/core';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { Order, OrderView } from '@shared/models/interfaces/order.model';
import { Segment } from '@shared/models/interfaces/ride.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { OrderStore } from '@shared/store/orders/orders.store';
import { UserStore } from '@shared/store/users/users.store';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderStore = inject(OrderStore);

  private userStore = inject(UserStore);

  private stationStore = inject(StationStore);

  private carriageStore = inject(CarriageStore);

  constructor(private adminGuard: AdminRoleGuard) {}

  async initStore() {
    const isManager = this.adminGuard.canActivate();
    await this.orderStore.getOrders();
    await this.stationStore.getStations();
    await this.carriageStore.getCarriages();
    if (isManager) {
      await this.userStore.getUsers();
    }
  }

  async getOrderViews(): Promise<OrderView[]> {
    await this.initStore();
    const orders = this.orderStore.ordersEntities();
    const stationsMap = this.stationStore.stationsEntityMap();

    return orders.map((order) => {
      const tripSegments = this.getTripSegments(order);

      const startStation = stationsMap[order.stationStart].city;
      const startTime = tripSegments[0].time[0];
      const endStation = stationsMap[order.stationEnd].city;
      const endTime = tripSegments[tripSegments.length - 1].time[1];
      const tripDuration = this.getTripDuration(tripSegments);
      const { carType, carNumber, seatNumber } = this.getCarInfo(order);
      const price = this.getTripPrice(tripSegments, carType);

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
        seatNumber,
        price,
      };
    });
  }

  private getTripDuration(segments: Segment[]) {
    const startTime = segments[0].time[0];
    const endTime = segments[segments.length - 1].time[1];
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end.getTime() - start.getTime();

    return diff;
  }

  private getTripPrice(tripSegments: Segment[], carType: string): number {
    return tripSegments.reduce((acc, segment) => {
      return acc + segment.price[carType];
    }, 0);
  }

  private getCarInfo(order: Order): {
    carType: string;
    carNumber: number;
    seatNumber: number;
  } {
    const seatNumber = order.seatId;
    const seatScopes = this.getSeatScopes(order);

    for (let i = 0; i < order.carriages.length; i += 1) {
      const { from, to } = seatScopes[i];
      if (seatNumber >= from && seatNumber <= to) {
        return {
          carType: order.carriages[i],
          carNumber: i + 1,
          seatNumber: seatNumber - from + 1,
        };
      }
    }
    return { carType: '', carNumber: 0, seatNumber: 0 };
  }

  private getTripSegments(order: Order): Segment[] {
    const schedule: Segment[] = [];
    const fromStationIdx = order.path.indexOf(order.stationStart);
    const toStationIdx = order.path.indexOf(order.stationEnd);

    if (fromStationIdx === -1 || toStationIdx === -1) {
      return [];
    }

    for (let i = fromStationIdx; i < toStationIdx; i += 1) {
      schedule.push(order.schedule.segments[i]);
    }
    return schedule;
  }

  private getSeatScopes(order: Order): { from: number; to: number }[] {
    const { carriages } = order;
    const seatScopes: { from: number; to: number }[] = [];

    let fromSeat = 1;
    carriages.forEach((carType) => {
      const carriage = this.carriageStore
        .carriagesEntities()
        .find((c) => c.name === carType)!;

      const toSeat = fromSeat + carriage.seats.length - 1;
      seatScopes.push({ from: fromSeat, to: toSeat });
      fromSeat = toSeat + 1;
    });

    return seatScopes;
  }
}
