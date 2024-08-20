export interface RailRoute {
    id: number;
    path: number[];
    carriages: string[];
}

// https://github.com/rolling-scopes-school/tasks/blob/master/tasks/train-a/admin/stations.md
export interface Station {
    id: number;
    city: string;
    connectedTo: Connection[];
}

export interface Connection {
    id: number;
    distance: number;
}