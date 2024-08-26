import { StationStore } from '@admin/store/stations/stations.store';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TripInfo } from '@home/models/trip.models';
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
  tripStore = inject(TripStore);

  orderStore = inject(OrderStore);

  userStore = inject(UserStore);

  rideStore = inject(RideStore);

  stationStore = inject(StationStore);

  tripInfo: TripInfo = {} as TripInfo;

  bookItems = this.tripStore.getBookItems();

  isLoading = signal<boolean>(true);

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    const fromId = this.activatedRoute.snapshot.queryParams.from;
    const toId = this.activatedRoute.snapshot.queryParams.to;

    if (!rideId || !fromId || !toId) {
      this.router.navigate(['/404']);
      return;
    }

    this.initStore(Number(rideId), Number(fromId), Number(toId));
  }

  private async initStore(rideId: number, fromId: number, toId: number) {
    this.isLoading.set(true);
    await this.tripStore.initStore(rideId, fromId, toId);

    const connectionsExists = this.tripStore.rideSegments.length > 0;
    if (!connectionsExists) {
      this.router.navigate(['/404']);
      return;
    }

    this.tripInfo = this.tripStore.getEdgeStationsInfo();
    this.isLoading.set(false);
  }

  async onBook() {
    const { rideId } = this.tripInfo;
    const userId = this.userStore.getCurrentUser()?.id ?? 0;
    if (this.orderStore.hasOrder(userId, rideId)) {
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
    // TODO: open dialog (RouteModalComponent) when implemented]
    const ride = this.tripStore.ride();
    console.log(
      'Open Route dialog: ride = ',
      ride,
      ', start = ',
      ride.path[0],
      ', end =',
      ride.path[ride.path.length - 1],
    );
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
