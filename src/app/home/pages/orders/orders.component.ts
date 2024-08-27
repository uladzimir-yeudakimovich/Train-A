import { Component, OnInit, signal } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { OrderService } from '@home/services/orders/order.service';
import { Order, OrderView } from '@shared/models/interfaces/order.model';

import { sortOrders } from './orders.utils';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatSortModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orderViews = signal<OrderView[]>([]);

  sortedOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  async ngOnInit() {
    const orders = await this.orderService.getOrderViews();
    this.orderViews.set(orders);
  }

  onCancelOrder(orderId: number) {
    // TODO
    console.log('Cancel order', orderId);
  }

  sortOrders(sort: Sort) {
    return sortOrders(sort, this.orderViews());
  }
}
