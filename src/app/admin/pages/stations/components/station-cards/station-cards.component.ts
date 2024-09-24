import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '@shared/models/enums/messages.enum';
import { OrderStatus } from '@shared/models/interfaces/order.model';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';
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
export class StationCardsComponent implements AfterViewInit {
  stations!: Signal<Station[]>;

  private stationStore = inject(StationStore);

  private orderStore = inject(OrderStore);

  constructor(
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.stations = this.stationStore.stationsEntities;
  }

  ngAfterViewInit(): void {
    const { fragment } = this.activatedRoute.snapshot;
    const element = document.getElementById(fragment ?? '');
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - window.innerHeight - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  deleteStation(id: number): void {
    const orders = this.orderStore.ordersEntities();
    const hasActiveOrder = orders.some(
      (order) => order.status === OrderStatus.Active && order.path.includes(id),
    );

    if (hasActiveOrder) {
      this.snackBarService.open(Message.DeleteStationWithActiveRides);
    } else {
      this.stationStore.deleteStation(id);
    }
  }
}
