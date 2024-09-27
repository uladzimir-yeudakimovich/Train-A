import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { sanitizeId } from '@admin/utils/specialCharactersSanitizer';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Renderer2,
  Signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private renderer: Renderer2,
  ) {
    this.stations = this.stationStore.stationsEntities;
  }

  ngAfterViewInit(): void {
    const { fragment } = this.activatedRoute.snapshot;
    if (fragment) {
      setTimeout(() => this.scrollToCity(fragment), 1000);
    }
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

  getConnectedCities(station: Station): string[] {
    return station.connectedTo
      .map(
        (connectedStation) =>
          this.stations().find((s) => s.id === connectedStation.id)?.city,
      )
      .filter((city): city is string => Boolean(city));
  }

  navigateToStation(city: string): void {
    this.router.navigate([], {
      fragment: city,
      relativeTo: this.activatedRoute,
    });
    this.scrollToCity(city);
  }

  private scrollToCity(city: string): void {
    const sanitizedCity = sanitizeId(city);
    const element = this.renderer.selectRootElement(
      `#station${sanitizedCity}`,
      true,
    );
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
