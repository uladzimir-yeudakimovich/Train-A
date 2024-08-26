import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderStatus } from '@shared/models/interfaces/order.model';
import { OrderStore } from '@shared/store/orders/orders.store';

import { stationCardsImports } from './station-cards.config';

@Component({
  selector: 'app-station-cards',
  standalone: true,
  imports: stationCardsImports,
  templateUrl: './station-cards.component.html',
  styleUrl: './station-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationCardsComponent {
  stations!: Signal<Station[]>;

  private stationStore = inject(StationStore);

  private orderStore = inject(OrderStore);

  constructor(private snackBar: MatSnackBar) {
    this.stations = this.stationStore.stationsEntities;
  }

  deleteStation(id: number): void {
    const orders = this.orderStore.ordersEntities();
    const hasActiveOrder = orders.some(
      (order) => order.status === OrderStatus.Active && order.path.includes(id),
    );

    if (hasActiveOrder) {
      this.snackBar.open('Cannot delete station with active rides', 'Close', {
        duration: 5000,
      });
    } else {
      this.stationStore.deleteStation(id);
    }
  }
}
