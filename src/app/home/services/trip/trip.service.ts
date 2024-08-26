import { Station } from '@admin/models/station.model';
import { Injectable } from '@angular/core';
import { Segment } from '@shared/models/interfaces/ride.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  rideSegments: Segment[] = [];

  private fromStation: Station = {} as Station;

  private toStation: Station = {} as Station;
}
