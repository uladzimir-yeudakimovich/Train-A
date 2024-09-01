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
  ridePrice: [string, number][];
  rideFrom: RidePoint;
  rideTo: RidePoint;
}
//! add free seats amount !!!
