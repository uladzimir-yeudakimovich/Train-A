import { RailRoute } from './route.model';

export interface Segment {
  time: [string, string];
  price: Record<string, number>;
}

export interface Ride {
  rideId: number;
  segments: Segment[];
}

export interface RideRoute extends RailRoute {
  schedule: Ride[];
}

export interface RouteInformation {
  routeId: number;
  carriages: string[];
  stations: string[];
  schedule: Ride[];
}
