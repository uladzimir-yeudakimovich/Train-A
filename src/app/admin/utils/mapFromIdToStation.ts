import { StationFormInterface } from '@admin/models/station-form.model';
import { StationInterface } from '@admin/models/station.model';

export const mapFromIdToStation = (
  { id }: { id: number },
  { city, latitude, longitude, relations }: StationFormInterface,
): StationInterface => {
  return {
    id,
    city,
    latitude,
    longitude,
    connectedTo: relations.map((id) => ({ id })),
  };
};
