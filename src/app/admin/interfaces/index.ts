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
