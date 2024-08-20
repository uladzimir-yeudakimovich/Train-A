export interface Station {
    id: number;
    city: string;
    latitude: number;
    longitude: number;
    connectedTo: Connection[];
}

export interface Connection {
    id: number;
    distance: number;
}
