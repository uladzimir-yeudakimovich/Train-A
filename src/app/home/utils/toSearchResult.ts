import { RideStation, SearchCard } from '@home/models/search-card.model';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRide } from '@home/models/search-route.model';

const getRideTime = (startTime: Date, endTime: Date): number =>
  new Date(endTime).getTime() - new Date(startTime).getTime();

const getRidePrice = (rides: SearchRide[]) => {
  const prices = rides.map((ride) => ride.price);

  const totalPrice = prices.reduce(
    (acc, price) => {
      Object.keys(price).forEach((key) => {
        if (acc[key]) {
          acc[key] += price[key];
        } else {
          acc[key] = price[key];
        }
      });

      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(totalPrice);
};

const getRideRoute = (path: number[], rides: SearchRide[]): RideStation[] => {
  return path.map((stationId, index) => {
    const rideStation: RideStation = { stationId };

    switch (true) {
      case index === 0: {
        const [startTime] = rides[index].time;
        rideStation.startTime = startTime;
        break;
      }
      case index === rides.length: {
        const [, endTime] = rides[index - 1].time;
        rideStation.startTime = endTime;
        break;
      }
      default: {
        const [, endTime] = rides[index - 1].time;
        const [startTime] = rides[index].time;
        rideStation.startTime = endTime;
        rideStation.endTime = startTime;
        rideStation.timeSpan = getRideTime(
          rideStation.startTime,
          rideStation.endTime,
        );
      }
    }

    return rideStation;
  });
};

export const toSearchResult = (response: SearchResponse): SearchCard[] => {
  const { from, to, routes } = response;
  return routes.flatMap(({ path, schedule }) => {
    const fromIdIndex = path.findIndex((point) => point === from.stationId) - 1;
    const toIdIndex = path.findIndex((point) => point === to.stationId) - 1;

    return schedule.map(({ rideId, segments }) => {
      const segmentsChunk = segments.slice(
        fromIdIndex < 0 ? 0 : fromIdIndex,
        toIdIndex,
      );

      const fromTime = segmentsChunk.at(0)!.time[0];
      const toTime = segmentsChunk.at(-1)!.time[0];

      const rideTime = getRideTime(fromTime, toTime);

      const rideRoute = getRideRoute(path, segments);

      const ridePrice = getRidePrice(segmentsChunk);

      return {
        rideId,
        rideRoute,
        rideTime,
        ridePrice,

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
