export interface RideStation {
  stationId: number;
  stationName?: string;
  startTime?: Date;
  endTime?: Date;
  timeSpan?: number;
}

export interface RidePoint {
  id: number;
  city: string;
  time: Date;
}

export interface SearchCard {
  rideId: number;
  rideRoute: RideStation[];
  rideTime: number;
  carTypeInfo: {
    carType: string;
    price: number;
    availableSeats: number;
  }[];
  rideFrom: RidePoint;
  rideTo: RidePoint;
}
