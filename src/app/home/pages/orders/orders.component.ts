import {
  AfterViewInit,
  Component,
  effect,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '@home/services/orders/order.service';
import { OrderStatus, OrderView } from '@shared/models/interfaces/order.model';

import { displayedColumns, ordersImports } from './orders.config';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: ordersImports,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, AfterViewInit {
  isLoading = signal<boolean>(true);

  displayedColumns: string[] = displayedColumns;

  dataSource = new MatTableDataSource<OrderView>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) {
    effect(() => {
      const orderViews = this.orderService.orderViews();
      this.dataSource.data = orderViews;
    });
  }

  async ngOnInit() {
    await this.orderService.initStore();
    this.isLoading.set(false);
  }

  async ngAfterViewInit() {
    await this.orderService.initStore(); // sort is undefined without it
    this.dataSource.sort = this.sort;
  }

  onCancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }

  get orderStatus() {
    return OrderStatus;
  }
}
