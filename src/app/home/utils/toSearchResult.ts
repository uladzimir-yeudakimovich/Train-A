import { RideStation, SearchCard } from '@home/models/search-card.model';
import { SearchRide, SearchRoute } from '@home/models/search-route.model';
import { SearchStation } from '@home/models/search-station.model';

const getRideTime = (startTime: Date, endTime: Date): string => {
  const milliseconds =
    new Date(endTime).getTime() - new Date(startTime).getTime();

  const millisecondsInSecond = 1000;
  const secondsInMinute = 60;
  const minutesInHour = 60;
  const hoursInDay = 24;

  const days = Math.floor(
    milliseconds /
      (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay),
  );

  const hours = Math.floor(
    (milliseconds %
      (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) /
      (millisecondsInSecond * secondsInMinute * minutesInHour),
  );

  const minutes = Math.floor(
    (milliseconds % (millisecondsInSecond * secondsInMinute * minutesInHour)) /
      (millisecondsInSecond * secondsInMinute),
  );

  return days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
};

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

const getRidePath = (path: number[], rides: SearchRide[]): RideStation[] => {
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
      }
    }

    return rideStation;
  });
};

export const toSearchResult = (
  fromStation: SearchStation,
  toStation: SearchStation,
  routes: SearchRoute[],
): SearchCard[] => {
  return routes.flatMap(({ path, schedule }) => {
    const fromIdIndex =
      path.findIndex((point) => point === fromStation.stationId) - 1;
    const toIdIndex =
      path.findIndex((point) => point === toStation.stationId) - 1;

    return schedule.map(({ rideId, segments }) => {
      const segmentsChunk = segments.slice(
        fromIdIndex < 0 ? 0 : fromIdIndex,
        toIdIndex,
      );

      const fromTime = segmentsChunk.at(0)!.time[0];
      const toTime = segmentsChunk.at(-1)!.time[0];

      const rideTime = getRideTime(fromTime, toTime);

      const ridePath = getRidePath(path, segments);

      const ridePrice = getRidePrice(segmentsChunk);

      return {
        rideId,
        ridePath,
        rideTime,
        ridePrice,

        from: {
          id: fromStation.stationId,
          city: fromStation.city,
          time: fromTime,
        },

        to: {
          id: toStation.stationId,
          city: toStation.city,
          time: toTime,
        },
      };
    });
  });
};
