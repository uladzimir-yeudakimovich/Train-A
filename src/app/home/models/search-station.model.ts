export interface SearchStation {
  stationId: number;
  city: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
}
