import { StationInterface, StationWithConnectedCitiesInterface } from '@admin/models/station.model';
import { EntityMap } from '@ngrx/signals/entities';

export const transformStationsConnected = (
  stationsArr: StationInterface[],
  stationsMap: EntityMap<StationInterface>,
): StationWithConnectedCitiesInterface[] =>
  stationsArr.map((station) => {
    const { id, city, latitude, longitude, connectedTo } = station;

    const connectedCities = connectedTo.map(({ id }) => stationsMap[id].city).join(', ');

    return {
      id,
      city,
      latitude,
      longitude,
      connectedCities,
    };
  });
