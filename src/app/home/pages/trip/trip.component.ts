import { JsonPipe } from '@angular/common';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { Ride } from '@shared/models/interfaces/ride.model';
import { RideStore } from '@shared/store/ride/ride.store';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  ride!: Signal<Ride>;

  rideStore = inject(RideStore);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // /trip/:rideId?from=stationId&to=stationId
    const rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    const fromStationId =
      this.activatedRoute.snapshot.queryParamMap.get('from');
    const toStationId = this.activatedRoute.snapshot.queryParamMap.get('to');

    if (!(rideId && fromStationId && toStationId)) {
      this.router.navigate([RoutePath.NotFound]);
    }

    this.rideStore.getRide(Number(rideId));
    this.ride = computed(() => this.rideStore.ridesEntityMap()[Number(rideId)]);
  }
}
