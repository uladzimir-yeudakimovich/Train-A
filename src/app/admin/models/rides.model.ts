import { RailRoute } from './route.model';

export interface Segment {
  time: [string, string];
  price: Record<string, number>;
}

export interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface RideRoute extends RailRoute {
  schedule: Schedule[];
}

export interface RouteInformation {
  routeId: number;
  carriages: string[];
  stations: string[];
  schedule: Schedule[];
}
