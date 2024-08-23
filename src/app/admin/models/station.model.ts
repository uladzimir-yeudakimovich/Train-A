export interface Connection {
  id: number;
  distance?: number;
}

export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
}

export interface StationResponseItem extends Station {
  connectedTo: Connection[];
}

export interface StationCardItem extends Station {
  connected: string;
}
