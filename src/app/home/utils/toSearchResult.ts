import { SearchRide, SearchRoute } from '@home/models/search-route.model';
import { SearchStation } from '@home/models/search-station.model';

const toHoursAndMinutes = (startTime: Date, endTime: Date): string => {
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

const calculatePrice = (rides: SearchRide[]) => {
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

export const toSearchResult = (
  fromStation: SearchStation | null,
  toStation: SearchStation | null,
  routes: SearchRoute[],
) => {
  if (!fromStation || !toStation) {
    return [];
  }

  return routes.flatMap(({ path, schedule }) => {
    const fromIdIndex =
      path.findIndex((point) => point === fromStation.stationId) - 1;
    const toIdIndex =
      path.findIndex((point) => point === toStation.stationId) - 1;

    return schedule.map(({ segments }) => {
      const segmentsChunk = segments.slice(
        fromIdIndex < 0 ? 0 : fromIdIndex,
        toIdIndex,
      );

      const prevPoint = segmentsChunk.at(0)!;
      const nextPoint = segmentsChunk.at(-1)!;

      const fromCityTime = prevPoint.time[0];
      const toCityTime = nextPoint.time[0];

      const timeSpan = toHoursAndMinutes(fromCityTime, toCityTime);

      const price = calculatePrice(segmentsChunk);

      return {
        fromCityName: fromStation.city,
        toCityName: toStation.city,
        startPointPath: path.at(0)!,
        finishPointPath: path.at(-1)!,
        fromCityTime,
        toCityTime,
        timeSpan,
        price,
      };
    });
  });
};
