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

    return stations.reduce((acc, station, _, arr) => {
      const connected = station.connectedTo
        .map(
          (connectedToProps) =>
            arr.find((item) => item.id === connectedToProps.id)?.city,
        )
        .filter((city) => !!city)
        .join(' - ');

      acc.push({
        id: station.id,
        city: station.city,
        latitude: station.latitude,
        longitude: station.longitude,
        connected,
      });
      return acc;
    }, [] as StationCardItem[]);
  }
}
