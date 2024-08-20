export interface ConnectedInterface {
  id: number;
  distance?: number;
}

export interface StationInterface {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedInterface[];
}

export interface StationCardInterface {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connected: string;
}
