import { SearchRoute } from '@home/models/search-route.model';
import { SearchStation } from '@home/models/search-station.model';

const toHoursAndMinutes = (startTime: Date, endTime: Date): string => {
  const milliseconds =
    new Date(endTime).getTime() - new Date(startTime).getTime();

  const minutesInMilliseconds = Math.floor(milliseconds / (60 * 1000));

  const hours = Math.floor(minutesInMilliseconds / 60);
  const minutes = minutesInMilliseconds % 60;

  return `${hours}h ${minutes}m`;
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
      const prevPoint = segments[fromIdIndex < 0 ? 0 : fromIdIndex];
      const nextPoint = segments[toIdIndex];

      const fromCityTime = prevPoint.time[0];
      const toCityTime = nextPoint.time[0];

      const timeSpan = toHoursAndMinutes(fromCityTime, toCityTime);

      return {
        fromCityName: fromStation.city,
        toCityName: toStation.city,
        startPointPath: path[0],
        finishPointPath: path[path.length - 1],
        fromCityTime,
        toCityTime,
        timeSpan,
      };
    });
  });
};
