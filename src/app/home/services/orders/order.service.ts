import { StationStore } from '@admin/store/stations/stations.store';
import { computed, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { ConfirmationDialogComponent } from '@shared/components/delete-dialog/confirmation-dialog.component';
import { OrderView } from '@shared/models/interfaces/order.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { OrderStore } from '@shared/store/orders/orders.store';
import { UserStore } from '@shared/store/users/users.store';
import { transformOrderToView } from '@shared/utils/ride.utils';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderStore = inject(OrderStore);

  userStore = inject(UserStore);

  orderViews = computed(() => this.getOrderViews());

  readonly dialog = inject(MatDialog);

  private stationStore = inject(StationStore);

  private carriageStore = inject(CarriageStore);

  constructor(
    private adminGuard: AdminRoleGuard,
    private snackBar: MatSnackBar,
  ) {}

  async initStore() {
    const isManager = this.adminGuard.canActivate();
    await this.orderStore.getOrders();
    await this.stationStore.getStations();
    await this.carriageStore.getCarriages();
    if (isManager) {
      await this.userStore.getUsers();
    }
  }

  cancelOrder(orderId: number) {
    let title = `Cancel Order ${orderId}`;
    if (this.adminGuard.canActivate()) {
      const order = this.orderStore.ordersEntityMap()[orderId];
      const user = this.userStore.usersEntityMap()[order.userId];
      title = `Cancel ${user.email}'s Order ${orderId}`;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title,
        message: 'Are you sure you want to cancel this order?',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.orderStore.cancelOrder(orderId);
          this.snackBar.open('Order has been successfully canceled.', 'Close', {
            duration: 5000,
          });
          // eslint-disable-next-line
        } catch (error: any) {
          if (error.status === 400 && error.error && error.error.message) {
            this.snackBar.open(error.error.message, 'Close', {
              duration: 5000,
            });
          } else {
            this.snackBar.open('An unexpected error occurred.', 'Close', {
              duration: 5000,
            });
          }
        }
      }
    });
  }

  private getOrderViews(): OrderView[] {
    try {
      const orders = this.orderStore.ordersEntities();
      const stationsMap = this.stationStore.stationsEntityMap();
      const carriages = this.carriageStore.carriagesEntities();
      return orders.map((order) =>
        transformOrderToView(stationsMap, order, carriages),
      );
    } catch {
      return [];
    }
  }
}
