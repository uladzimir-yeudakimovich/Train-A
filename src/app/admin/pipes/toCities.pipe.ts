import { Connection, Station } from '@admin/models/station.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCities',
  standalone: true,
})
export class ToCitiesPipe implements PipeTransform {
  transform(connectedTo: Connection[], stations: Station[]): string {
    if (connectedTo.length === 0) {
      return '';
    }
    const cityNames = connectedTo
      .map(
        (connectedToProps) =>
          stations.find((item) => item.id === connectedToProps.id)?.city,
      )
      .filter(Boolean);

    return cityNames.join(' - ');
  }
}
