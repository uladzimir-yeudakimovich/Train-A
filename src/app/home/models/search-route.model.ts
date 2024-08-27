interface SearchRide {
  occupiedSeats: number[];
  price: { carriage1: number; carriage2: number; carriage3: number };
  time: Date[];
}

interface SearchSchedule {
  rideId: number;
  segments: SearchRide[];
}

export interface SearchRoute {
  id: number;
  carriages: string[];
  path: number[];
  schedule: SearchSchedule[];
}
