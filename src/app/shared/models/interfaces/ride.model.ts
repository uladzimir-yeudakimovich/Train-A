export interface Segment {
  time: [string, string];
  price: Record<string, number>;
  occupiedSeats?: number[];
}

export interface Ride {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: {
    segments: Segment[];
  };
}
