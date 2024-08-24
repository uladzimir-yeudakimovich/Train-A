import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripStore } from '@home/store/trip/trip.store';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';

import { tripImports } from './trip.config';

// TODO: refactor this bullshit
@Component({
  selector: 'app-trip',
  standalone: true,
  imports: tripImports,
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  tripStore = inject(TripStore);

  tripInfo = this.tripStore.getEdgeStationsInfo();

  typewWithCarriages = this.tripStore.getCarriageTypeMap();

  availableSeatsNumber = this.tripStore.getAvailableSeats();

  priceMap = this.tripStore.getPriceMap();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // /trip/:rideId?from=stationId&to=stationId
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    const fromId = this.activatedRoute.snapshot.queryParams.from;
    const toId = this.activatedRoute.snapshot.queryParams.to;
    this.tripStore.initStore(Number(rideId), Number(fromId), Number(toId));
  }

  onBack(): void {
    this.router.navigate([RoutePath.Search]);
  }

  onRoute(): void {
    console.log('Open Route dialog ', this.tripStore.ride());
    // console.log('Open Route dialog ', this.ride());
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
