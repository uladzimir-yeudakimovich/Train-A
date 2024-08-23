import {
  StationCardItem,
  StationResponseItem,
} from '@admin/models/station.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCities',
  standalone: true,
})
export class ToCitiesPipe implements PipeTransform {
  transform(stations: StationResponseItem[]): StationCardItem[] {
    if (stations.length === 0) {
      return [];
    }

    return stations.reduce(
      (acc, { id, city, latitude, longitude, connectedTo }, _, arr) => {
        const connected = connectedTo
          .map(({ id }) => arr.find((item) => item.id === id)?.city)
          .filter((city) => !!city)
          .join(' - ');

        acc.push({
          id,
          city,
          latitude,
          longitude,
          connected,
        });
        return acc;
      },
      [] as StationCardItem[],
    );
  }
}
