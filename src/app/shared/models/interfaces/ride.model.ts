export interface Segment {
  time: [string, string];
  price: Record<string, number>;
  occuppiedSeats?: number[];
}

export interface Ride {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Segment[];
}
