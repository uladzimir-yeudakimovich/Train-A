import { StationStore } from '@admin/store/stations/stations.store';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteModalComponent } from '@home/components/route-modal/route-modal.component';
import { BookItem, TripInfo } from '@home/models/trip.models';
import { TripService } from '@home/services/trip/trip.service';
import { TripStore } from '@home/store/trip/trip.store';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';
import { OrderStore } from '@shared/store/orders/orders.store';
import { RideStore } from '@shared/store/ride/ride.store';
import { UserStore } from '@shared/store/users/users.store';

import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { tripImports } from './trip.config';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: tripImports,
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  // TODO: refactor whole component
  tripStore = inject(TripStore);

  orderStore = inject(OrderStore);

  userStore = inject(UserStore);

  rideStore = inject(RideStore);

  stationStore = inject(StationStore);

  tripInfo: TripInfo = {} as TripInfo;

  bookItems!: Signal<BookItem[]>;

  isLoading = signal<boolean>(true);

  priceMap: Record<string, number> = {};

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private tripService: TripService,
  ) {}

  ngOnInit(): void {
    const rideId = Number(this.activatedRoute.snapshot.paramMap.get('rideId'));
    const fromId = Number(this.activatedRoute.snapshot.queryParams.from);
    const toId = Number(this.activatedRoute.snapshot.queryParams.to);

    if (!rideId || !fromId || !toId) {
      this.router.navigate(['/404']);
      return;
    }

    this.bookItems = this.tripService.getBookItems();
    this.initStore(rideId, fromId, toId);
  }

  private async initStore(rideId: number, fromId: number, toId: number) {
    this.isLoading.set(true);
    await this.tripService.initStore(rideId, fromId, toId);
    await this.orderStore.getOrders();

    const connectionsExists = this.tripService.rideSegments.length > 0;
    if (!connectionsExists) {
      this.router.navigate(['/404']);
      return;
    }

    this.priceMap = this.tripService.getPriceMap();
    this.tripInfo = this.tripService.getEdgeStationsInfo();
    this.isLoading.set(false);
  }

  async onBook() {
    const { rideId } = this.tripInfo;
    if (this.orderStore.hasOrder(rideId)) {
      this.snackBar.open('You have already booked this trip', 'Close', {
        duration: 5000,
      });
      return;
    }

    const bookItems = this.bookItems().map((item) => {
      return {
        seat: item.seatNumber,
        carCode: item.carId,
      };
    });
    const stationStart = this.tripInfo.from.id;
    const stationEnd = this.tripInfo.to.id;
    const seatScopes = this.tripStore.getSeatScopes();

    this.tripStore.selectedToReserved();

    const orders = bookItems.forEach(({ seat, carCode }) => {
      // map seat number to api format
      const seatNumber = seatScopes[carCode].from + seat - 1;
      this.orderStore.createOrder(rideId, seatNumber, stationStart, stationEnd);
    });
    await orders;

    this.dialog.open(OrderDialogComponent, {
      data: { tripInfo: this.tripInfo },
    });
  }

  onBack(): void {
    this.router.navigate([RoutePath.Search]);
  }

  onRoute(): void {
    this.dialog.open(RouteModalComponent, {
      data: {
        rideId: this.tripInfo.rideId,
        from: this.tripInfo.from.id,
        to: this.tripInfo.to.id,
      },
    });
  }

  get legendSeats(): { description: string; seat: CarSeat }[] {
    return [
      {
        description: 'Reserved seat',
        seat: { number: 1, state: SeatState.Reserved },
      },
      {
        description: 'Avilable seat',
        seat: { number: 1, state: SeatState.Available },
      },
      {
        description: 'Selected seat',
        seat: { number: 1, state: SeatState.Selected },
      },
    ];
  }
}
