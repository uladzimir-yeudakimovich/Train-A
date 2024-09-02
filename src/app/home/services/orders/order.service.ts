import { StationStore } from '@admin/store/stations/stations.store';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { displayedColumns } from '@home/pages/orders/orders.config';
import { ConfirmationDialogComponent } from '@shared/components/delete-dialog/confirmation-dialog.component';
import { ErrorReason } from '@shared/models/enums/api-path.enum';
import { Message } from '@shared/models/enums/messages.enum';
import { Order, OrderView } from '@shared/models/interfaces/order.model';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { OrderStore } from '@shared/store/orders/orders.store';
import { UserStore } from '@shared/store/users/users.store';
import { transformOrderToView } from '@shared/utils/ride.utils';
import { ProfileService } from '@user/services/profile.service';

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
    private profileService: ProfileService,
    private snackBarService: SnackBarService,
  ) {}

  async initStore() {
    const isManager = this.profileService.userRole() === 'manager';
    await this.orderStore.getOrders();
    await this.stationStore.getStations();
    await this.carriageStore.getCarriages();
    if (isManager) {
      await this.userStore.getUsers();
    }
  }

  cancelOrder(orderId: number) {
    let title = `Cancel Order ${orderId}`;
    if (this.profileService.userRole() === 'manager') {
      const order = this.orderStore.ordersEntityMap()[orderId];
      const user = this.userStore.usersEntityMap()[order.userId];
      title = `Cancel ${user.name ?? user.email}'s Order ${orderId}`;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title,
        message: Message.OrderCancelConfirmation,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.orderStore
          .cancelOrder(orderId)
          .then(() => {
            this.snackBarService.open(Message.OrderCancelled);
          })
          .catch((error) => {
            this.errorSnackBar(error);
          });
      }
    });
  }

  getDisplayedColumns() {
    if (this.profileService.userRole() === 'manager') {
      return ['username', ...displayedColumns];
    }
    return displayedColumns;
  }

  private getOrderViews(): OrderView[] {
    try {
      const orders = this.orderStore.ordersEntities();
      const stationsMap = this.stationStore.stationsEntityMap();
      const carriages = this.carriageStore.carriagesEntities();
      const users = this.userStore.usersEntityMap();
      return orders.map((order: Order) => {
        const user = users[order.userId];
        return {
          ...transformOrderToView(stationsMap, order, carriages),
          userName: user?.name ?? user?.email,
        };
      });
    } catch {
      return [];
    }
  }

  private errorSnackBar(error: HttpErrorResponse) {
    switch (error.error.reason) {
      case ErrorReason.OrderNotFound:
        this.snackBarService.open(Message.OrderNotFound);
        break;
      case ErrorReason.OrderNotActive:
        this.snackBarService.open(Message.OrderNotActive);
        break;
      default:
        this.snackBarService.open(Message.UnexpectedError);
    }
  }
}
