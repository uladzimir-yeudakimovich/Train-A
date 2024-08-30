import { Station } from '@admin/models/station.model';
import { Carriage } from '@shared/models/interfaces/carriage.model';

export interface TripInfo {
  rideId: number;
  from: Station;
  to: Station;
  departure: string;
  arrival: string;
}

export interface TripView extends TripInfo {
  trainClasses: {
    name: string;
    carriages: Carriage[];
    price: number;
    availableSeats: number;
  }[];
}

export interface BookItem {
  carId: string;
  seatNumber: number;
  price: number;
}

export interface RouteModalData {
  rideId: number;
  from: number;
  to: number;
}

export interface RouteStop {
  station: Station;
  arrival?: string;
  departure?: string;
  dwellTime?: number;
}
