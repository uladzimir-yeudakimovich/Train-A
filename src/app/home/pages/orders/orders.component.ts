import { DeleteDialogComponent } from '@admin/components/delete-dialog/delete-dialog.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { TimePipe } from '@home/pipes/time.pipe';
import { OrderService } from '@home/services/orders/order.service';
import { OrderStatus, OrderView } from '@shared/models/interfaces/order.model';

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

  readonly dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private adminGuard: AdminRoleGuard,
  ) {
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
    let title = `Cancel Order ${orderId}`;
    if (this.adminGuard.canActivate()) {
      const order = this.orderService.orderStore.ordersEntityMap()[orderId];
      const user = this.orderService.userStore.usersEntityMap()[order.userId];
      title = `Cancel ${user.email}'s Order ${orderId}`;
    }

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title,
        message: 'Are you sure you want to cancel this order?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // TODO: Implement cancel logic
        console.log('Cancel order', orderId);
      }
    });
  }

  get orderStatus() {
    return OrderStatus;
  }
}
