export interface SearchRide {
  occupiedSeats: number[];
  price: Record<string, number>;
  time: string[];
}

export interface SearchSchedule {
  rideId: number;
  segments: SearchRide[];
}

export interface SearchRoute {
  id: number;
  carriages: string[];
  path: number[];
  schedule: SearchSchedule[];
}
