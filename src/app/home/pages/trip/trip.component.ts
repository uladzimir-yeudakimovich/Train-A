import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteModalComponent } from '@home/components/route-modal/route-modal.component';
import { BookItem, TripView } from '@home/models/trip.models';
import { TripService } from '@home/services/trip/trip.service';
import { TripStore } from '@home/store/trip/trip.store';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';
import { OrderStore } from '@shared/store/orders/orders.store';

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
  tripView!: Signal<TripView>;

  bookItems!: Signal<BookItem[]>;

  isLoading = signal<boolean>(true);

  readonly dialog = inject(MatDialog);

  private tripStore = inject(TripStore);

  private orderStore = inject(OrderStore);

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

    const connectionsExists = this.tripService.segments.length > 0;
    if (!connectionsExists) {
      this.router.navigate(['/404']);
      return;
    }
    this.tripView = this.tripService.getTripView();
    this.isLoading.set(false);
  }

  async onBook() {
    const { rideId } = this.tripView();
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
    const stationStart = this.tripView().from.id;
    const stationEnd = this.tripView().to.id;
    const seatScopes = this.tripStore.seatScopes();

    this.tripStore.selectedToReserved();

    const orders = bookItems.forEach(({ seat, carCode }) => {
      // map seat number to api format
      const seatNumber = seatScopes[carCode].from + seat - 1;
      this.orderStore.createOrder(rideId, seatNumber, stationStart, stationEnd);
    });
    await orders;

    this.dialog.open(OrderDialogComponent, {
      data: { tripInfo: this.tripView() },
    });
  }

  onBack(): void {
    this.router.navigate([RoutePath.Search]);
  }

  onRoute(): void {
    this.dialog.open(RouteModalComponent, {
      data: {
        rideId: this.tripView().rideId,
        from: this.tripView().from.id,
        to: this.tripView().to.id,
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
