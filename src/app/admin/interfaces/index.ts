export interface Segment {
  time: [string, string];
  price: Record<string, number>;
}

export interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface Route {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  // TODO: create a separate interface for { id: number; distance: number }
  connectedTo: { id: number; distance: number }[];
}

export interface RouteInformation {
  routeId: number;
  carriages: string[];
  stations: string[];
  schedule: Schedule[];
}
