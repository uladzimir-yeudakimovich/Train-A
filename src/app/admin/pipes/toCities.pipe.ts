import { StationCardInterface, StationInterface } from '@admin/models/station.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCities',
  standalone: true,
})
export class ToCitiesPipe implements PipeTransform {
  transform(stations: StationInterface[]): StationCardInterface[] {
    if (stations.length === 0) {
      return [];
    }

    return stations.reduce((acc, { id, city, latitude, longitude, connectedTo }, _, arr) => {
      const connected = connectedTo
        .map(({ id }) => arr.find((item) => item.id === id)?.city ?? 'unknown')
        .join(' - ');

      acc.push({
        id,
        city,
        latitude,
        longitude,
        connected,
      });
      return acc;
    }, [] as StationCardInterface[]);
  }
}