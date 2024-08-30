import {
  AfterViewInit,
  Component,
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

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.initStore().then(() => {
      this.isLoading.set(false);
    });
  }

  ngAfterViewInit() {
    this.orderService.initStore().then(() => {
      this.dataSource.data = this.orderService.orderViews();
      this.dataSource.sort = this.sort;
    });
  }

  onCancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }

  get orderStatus() {
    return OrderStatus;
  }
}
