export interface RideSegment {
  time: [string, string];
  price: Record<string, number>;
  occupiedSeats: number[];
}
