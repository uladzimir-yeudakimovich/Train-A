import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteModalComponent } from '@home/components/route-modal/route-modal.component';
import { BookItem, TripView } from '@home/models/trip.models';
import { TripService } from '@home/services/trip/trip.service';
import { ErrorReason } from '@shared/models/enums/api-path.enum';
import { Message } from '@shared/models/enums/messages.enum';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';
import { OrderStore } from '@shared/store/orders/orders.store';

import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { tripImports } from './trip.config';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: tripImports,
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent implements OnInit {
  tripView!: Signal<TripView>;

  bookItems!: Signal<BookItem[]>;

  isLoading = signal<boolean>(true);

  readonly dialog = inject(MatDialog);

  private orderStore = inject(OrderStore);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
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
    this.initTripView(rideId, fromId, toId);
  }

  onBook() {
    const { rideId } = this.tripView();
    if (this.orderStore.hasOrder(rideId)) {
      this.snackBarService.open(Message.AlreadyBooked);
      return;
    }

    this.tripService
      .createOrder(this.bookItems())
      .then(() => {
        this.dialog.open(OrderDialogComponent, {
          data: this.tripView(),
        });
      })
      .catch((error) => this.errorSnackBar(error));
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

  private async initTripView(rideId: number, fromId: number, toId: number) {
    this.isLoading.set(true);
    await this.tripService.initStore(rideId, fromId, toId);

    const connectionsExists = this.tripService.segments.length > 0;
    if (!connectionsExists) {
      this.router.navigate(['/404']);
      return;
    }

    this.tripView = this.tripService.getTripView();
    this.isLoading.set(false);
  }

  private errorSnackBar(error: HttpErrorResponse) {
    switch (error.error.reason) {
      case ErrorReason.RideNotFound:
        this.snackBarService.open(Message.RideNotFound);
        break;
      case ErrorReason.InvalidStations:
        this.snackBarService.open(Message.InvalidStations);
        break;
      case ErrorReason.AlreadyBooked:
        this.snackBarService.open(Message.AlreadyBooked);
        break;
      case ErrorReason.InvalidRide:
        this.snackBarService.open(Message.TripExpired);
        break;
      default:
        this.snackBarService.open(Message.UnexpectedError);
    }
  }
}
