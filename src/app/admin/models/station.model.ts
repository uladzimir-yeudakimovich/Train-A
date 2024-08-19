export interface StationInterface {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: { id: number; distance: number }[];
}

export interface StationWithConnectedCitiesInterface {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedCities: string;
}
