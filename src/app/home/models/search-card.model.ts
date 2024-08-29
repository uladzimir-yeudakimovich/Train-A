export interface RideStation {
  stationId: number;
  startTime?: Date;
  endTime?: Date;
}

export interface RidePoint {
  id: number;
  city: string;
  time: Date;
}

export interface SearchCard {
  rideId: number;
  ridePath: RideStation[];
  rideTime: string;
  ridePrice: [string, number][];
  from: RidePoint;
  to: RidePoint;
}
