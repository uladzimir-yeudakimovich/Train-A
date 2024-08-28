import {
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  Signal,
  signal,
  untracked,
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
export class OrdersComponent implements OnInit {
  isLoading = signal<boolean>(true);

  orderViews!: Signal<OrderView[]>;

  displayedColumns: string[] = displayedColumns;

  dataSource = signal<MatTableDataSource<OrderView>>(new MatTableDataSource());

  @ViewChild(MatSort) sort!: MatSort;

  private injector = inject(Injector);

  constructor(private orderService: OrderService) {}

  async ngOnInit() {
    await this.orderService.initStore();
    this.orderViews = this.orderService.orderViews;
    // TODO: fix sort
    const effectRef = effect(
      () => {
        const orderViews = this.orderViews();
        untracked(() => {
          this.isLoading.set(false);
          this.dataSource.set(new MatTableDataSource(orderViews));
          this.dataSource().sort = this.sort;
        });
        effectRef.destroy();
      },
      { injector: this.injector },
    );
  }

  onCancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }

  get orderStatus() {
    return OrderStatus;
  }
}
