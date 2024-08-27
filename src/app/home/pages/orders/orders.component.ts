import { Component, OnInit, Signal } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { OrderService } from '@home/services/orders/order.service';
import { Order } from '@shared/models/interfaces/order.model';

import { sortOrders } from './orders.utils';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatSortModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders!: Signal<Order[]>;

  sortedOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.initStore();
    this.orders = this.orderService.orderStore.ordersEntities;
  }

  onCancelOrder(orderId: number) {
    // TODO
    console.log('Cancel order', orderId);
  }

  sortOrders(sort: Sort) {
    return sortOrders(sort, this.orders());
  }
}
