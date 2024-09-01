import { RideStation, SearchCard } from '@home/models/search-card.model';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRide } from '@home/models/search-route.model';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Segment } from '@shared/models/interfaces/ride.model';
import { getSeats } from '@shared/utils/carriage.utils';
import {
  calculateAvailableSeatsByCarriageType,
  calculateTotalPriceByCarriageType,
  getSeatScopes,
} from '@shared/utils/ride.utils';

export const getRideTime = (startTime: Date, endTime: Date): number =>
  endTime.getTime() - startTime.getTime();

const getCarTypeInfo = (rides: SearchRide[], carriageTypes: Carriage[]) => {
  const carTypeInfo: {
    carType: string;
    price: number;
    availableSeats: number;
  }[] = [];

  const segments = rides.map((ride) => {
    return {
      time: ride.time,
      price: ride.price,
      occupiedSeats: ride.occupiedSeats,
    } as Segment;
  });
  const priceMap = calculateTotalPriceByCarriageType(segments);

  const tripCarriageTypes = Object.keys(segments[0].price);
  // const carriages = carriageStore.carriagesEntities();
  const tripCarriages: Carriage[] = tripCarriageTypes.map((carType, idx) => {
    const carriage = carriageTypes.find((c) => c.name === carType)!;
    return { ...carriage, code: (idx + 1).toString() };
  });
  const seatScopes = getSeatScopes(tripCarriages);

  const occupiedSeats = segments.flatMap((segment) => segment.occupiedSeats!);
  const tripCarriagesWithOccupiedSeats = tripCarriages.map((carriage, idx) => {
    const { from, to } = seatScopes[idx];
    const occupiedSeatsInCarriage = occupiedSeats
      .filter((s) => s >= from && s <= to)
      .map((seat) => seat - from + 1);
    return { ...carriage, seats: getSeats(carriage, occupiedSeatsInCarriage) };
  });
  const availableSeatsMap = calculateAvailableSeatsByCarriageType(
    tripCarriagesWithOccupiedSeats,
  );

  tripCarriageTypes.forEach((carType) => {
    const price = priceMap[carType];
    const availableSeats = availableSeatsMap[carType];
    carTypeInfo.push({ carType, price, availableSeats });
  });

  return carTypeInfo;
};

const getRideRoute = (path: number[], rides: SearchRide[]): RideStation[] => {
  return path.map((stationId, index) => {
    const rideStation: RideStation = { stationId };

    switch (true) {
      case index === 0: {
        const [startTime] = rides[index].time;

        rideStation.startTime = new Date(startTime);

        break;
      }
      case index === rides.length: {
        const [, endTime] = rides[index - 1].time;

        rideStation.startTime = new Date(endTime);

        break;
      }
      default: {
        const [, endTime] = rides[index - 1].time;

        const [startTime] = rides[index].time;

        rideStation.startTime = new Date(endTime);

        rideStation.endTime = new Date(startTime);

        rideStation.timeSpan = getRideTime(
          rideStation.startTime!,
          rideStation.endTime!,
        );
      }
    }

    return rideStation;
  });
};

export const toSearchResult = (
  response: SearchResponse,
  carriageTypes: Carriage[],
): SearchCard[] => {
  const { from, to, routes } = response;

  return routes.flatMap(({ path, schedule }) => {
    const fromIdIndex = path.findIndex((point) => point === from.stationId);

    const toIdIndex = path.findIndex((point) => point === to.stationId);

    return schedule.map(({ rideId, segments }) => {
      const segmentsChunk = segments.slice(
        fromIdIndex < 0 ? 0 : fromIdIndex,
        toIdIndex,
      );

      const fromTime = new Date(segmentsChunk.at(0)!.time[0]);
      const toTime = new Date(segmentsChunk.at(-1)!.time[1]);

      const rideTime = getRideTime(fromTime, toTime);

      const rideRoute = getRideRoute(path, segments);

      const carTypeInfo = getCarTypeInfo(segmentsChunk, carriageTypes);

      return {
        rideId,
        rideRoute,
        rideTime,
        carTypeInfo,

        rideFrom: {
          id: from.stationId,
          city: from.city,
          time: fromTime,
        },

        rideTo: {
          id: to.stationId,
          city: to.city,
          time: toTime,
        },
      };
    });
  });
};
