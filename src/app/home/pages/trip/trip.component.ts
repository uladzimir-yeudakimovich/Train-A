import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStore } from '@home/store/trip/trip.store';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';
import { OrderStore } from '@shared/store/orders/orders.store';

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

  ride = this.tripStore.ride;

  tripInfo = this.tripStore.getEdgeStationsInfo();

  typewWithCarriages = this.tripStore.getCarriageTypeMap();

  availableSeatsMap = this.tripStore.getAvailableSeatsMap();

  priceMap = this.tripStore.getPriceMap();

  bookItems = this.tripStore.getBookItems();

  orderStore = inject(OrderStore);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    const fromId = this.activatedRoute.snapshot.queryParams.from;
    const toId = this.activatedRoute.snapshot.queryParams.to;
    this.tripStore.initStore(Number(rideId), Number(fromId), Number(toId));
  }

  async onBook() {
    const { rideId } = this.ride();
    const seats = this.bookItems().map((item) => item.seatNumber);
    const stationStart = this.tripInfo().from.id;
    const stationEnd = this.tripInfo().to.id;

    this.tripStore.selectedToReserved();
    const orders = seats.forEach((seat) => {
      this.orderStore.createOrder(rideId, seat, stationStart, stationEnd);
    });
    await orders;
    console.log('Orders', this.orderStore.ordersEntities());
  }

  onBack(): void {
    this.router.navigate([RoutePath.Search]);
  }

  onRoute(): void {
    console.log('Open Route dialog ', this.tripStore.ride());
    // const dialogRef = this.dialog.open(RouteModalComponent, {
    //   data: {
    //     ride: this.ride()
    //     startStationId: this.ride().path[0],
    //     endStationId: this.route().path[this.route().path.length - 1],
    //   },
    // });
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
