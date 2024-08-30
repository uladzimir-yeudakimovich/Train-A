import { Connection, Station } from '@admin/models/station.model';
import { Pipe, PipeTransform } from '@angular/core';

import { JoinWithDashPipe } from './join-with-dash.pipe';

@Pipe({
  name: 'toCities',
  standalone: true,
})
export class ToCitiesPipe implements PipeTransform {
  constructor(private joinWithDashPipe: JoinWithDashPipe) {}

  transform(connectedTo: Connection[], stations: Station[]): string {
    if (connectedTo.length === 0) {
      return '';
    }
    const cityNames = connectedTo
      .map(
        (connectedToProps) =>
          stations.find((item) => item.id === connectedToProps.id)?.city,
      )
      .filter((city): city is string => Boolean(city));

    return this.joinWithDashPipe.transform(cityNames);
  }
}
