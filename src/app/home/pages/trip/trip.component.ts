import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  rideId: string | null = null;

  fromStationId: string | null = null;

  toStationId: string | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.rideId = this.activatedRoute.snapshot.paramMap.get('rideId');
    this.fromStationId = this.activatedRoute.snapshot.queryParamMap.get('from');
    this.toStationId = this.activatedRoute.snapshot.queryParamMap.get('to');

    if (!(this.rideId && this.fromStationId && this.toStationId)) {
      // Redirect to not found page
      this.router.navigate([RoutePath.NotFound]);
    }
  }
}
