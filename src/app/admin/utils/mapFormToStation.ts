import { Station } from '@admin/models/station.model';
import { StationFormData } from '@admin/models/station-form.model';

export const mapFormToStation = (
  stationData: StationFormData,
): Partial<Station> => {
  return {
    city: stationData.city,
    latitude: stationData.latitude,
    longitude: stationData.longitude,
    connectedTo: stationData.relations.map((item) => ({ id: item })),
  };
};
