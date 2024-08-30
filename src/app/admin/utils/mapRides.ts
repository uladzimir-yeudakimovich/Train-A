import { Ride, RideUI, Segment, SegmentUI } from '@admin/models/rides.model';

export const mapSegmentsToUI = (segments: Segment[]): SegmentUI[] => {
  return segments.map((segment) => {
    return {
      time: {
        departure: {
          date: segment.time[0].split('T')[0],
          time: segment.time[0].split('T')[1],
        },
        arrival: {
          date: segment.time[1].split('T')[0],
          time: segment.time[1].split('T')[1],
        },
      },
      price: segment.price,
    };
  });
};

export const mapSegmentsToBE = (segments: SegmentUI[]): Segment[] => {
  return segments.map((segment) => {
    return {
      time: [segment.time.departure.date, segment.time.arrival.date],
      price: segment.price,
    };
  });
};

export const mapRidesToUI = (rides: Ride[]): RideUI[] => {
  return rides.map((ride) => {
    return {
      rideId: ride.rideId,
      segments: mapSegmentsToUI(ride.segments),
    };
  });
};

export const mapRidesToBE = (rides: RideUI[]): Ride[] => {
  return rides.map((ride) => {
    return {
      rideId: ride.rideId,
      segments: mapSegmentsToBE(ride.segments),
    };
  });
};
