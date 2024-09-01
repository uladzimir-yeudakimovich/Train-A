import { Ride, RideUI, Segment, SegmentUI } from '@admin/models/rides.model';

export const mapSegmentsToUI = (segments: Segment[]): SegmentUI[] => {
  return segments.map((segment) => {
    return {
      time: {
        departure: {
          date: segment.time[0].split('T')[0],
          time: segment.time[0].split('T')[1].slice(0, 5),
        },
        arrival: {
          date: segment.time[1].split('T')[0],
          time: segment.time[1].split('T')[1].slice(0, 5),
        },
      },
      price: segment.price,
    };
  });
};

export const mapSegmentsToBE = (segments: SegmentUI[]): Segment[] => {
  return segments.map((segment) => {
    return {
      time: [
        new Date(
          `${segment.time.departure.date}T${segment.time.departure.time}`,
        ).toISOString(),
        new Date(
          `${segment.time.arrival.date}T${segment.time.arrival.time}`,
        ).toISOString(),
      ],
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
