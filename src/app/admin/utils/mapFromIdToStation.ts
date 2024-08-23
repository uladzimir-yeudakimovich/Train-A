import { StationFormData } from '@admin/models/station-form.model';
import { StationResponseItem } from '@admin/models/station.model';

export const mapFromIdToStation = (
  response: { id: number },
  stationData: StationFormData,
): StationResponseItem => {
  return {
    id: response.id,
    city: stationData.city,
    latitude: stationData.latitude,
    longitude: stationData.longitude,
    connectedTo: stationData.relations.map((item) => ({ id: item })),
  };
};
