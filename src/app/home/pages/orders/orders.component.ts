import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  computed,
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
export class OrdersComponent implements OnInit, AfterViewChecked {
  isLoading = signal<boolean>(true);

  displayedColumns: string[] = displayedColumns;

  getDataSource!: () => MatTableDataSource<OrderView>;

  private dataSourceComputed = computed(() => {
    const dataSource = new MatTableDataSource<OrderView>();
    return () => {
      dataSource.data = this.orderService.orderViews();
      return dataSource;
    };
  });

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getDataSource = this.dataSourceComputed();
    this.orderService.initStore().then(() => {
      this.isLoading.set(false);
    });
  }

  ngAfterViewChecked() {
    this.getDataSource().sort = this.sort;
  }

  onCancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
    this.cdr.detectChanges();
  }

  get orderStatus() {
    return OrderStatus;
  }
}
