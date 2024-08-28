import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  effect,
  OnInit,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TimePipe } from '@home/pipes/time.pipe';
import { OrderService } from '@home/services/orders/order.service';
import { OrderView } from '@shared/models/interfaces/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButton,
    DatePipe,
    CurrencyPipe,
    TimePipe,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orderViews = signal<OrderView[]>([]);

  displayedColumns: string[] = [
    'startStation',
    'startTime',
    'endStation',
    'endTime',
    'tripDuration',
    'carType',
    'carNumber',
    'seatNumber',
    'price',
    'actions',
  ];

  dataSource = signal<MatTableDataSource<OrderView>>(new MatTableDataSource());

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) {
    effect(() => {
      const orderViews = this.orderViews();
      untracked(() => {
        this.dataSource.set(new MatTableDataSource(orderViews));
        this.dataSource().sort = this.sort;
      });
    });
  }

  async ngOnInit() {
    const orders = await this.orderService.getOrderViews();
    this.orderViews.set(orders);
  }

  onCancelOrder(orderId: number) {
    // TODO
    console.log('Cancel order', orderId);
  }
}
