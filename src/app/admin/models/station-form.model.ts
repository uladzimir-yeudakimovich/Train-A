export interface StationFormInterface {
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
}

export type StationLocationTuple = [number, number] | [null, null];
