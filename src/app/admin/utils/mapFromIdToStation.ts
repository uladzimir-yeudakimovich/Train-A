import { Station } from '@admin/models/station.model';
import { StationFormData } from '@admin/models/station-form.model';

export const mapFromIdToStation = (
  response: { id: number },
  stationData: StationFormData,
): Station => {
  return {
    id: response.id,
    city: stationData.city,
    latitude: stationData.latitude,
    longitude: stationData.longitude,
    connectedTo: stationData.relations.map((item) => ({ id: item })),
  };
};
