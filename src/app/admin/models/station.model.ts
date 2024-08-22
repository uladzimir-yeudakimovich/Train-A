export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
}

export interface Connected {
  id: number;
  distance?: number;
}

export interface StationResponseItem extends Station {
  connectedTo: Connected[];
}

export interface StationCardItem extends Station {
  connected: string;
}
