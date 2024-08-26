import { Station } from '@admin/models/station.model';

export interface TripInfo {
  rideId: number;
  from: Station;
  to: Station;
  departure: string;
  arrival: string;
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
  city: string;
  arrival?: string;
  departure?: string;
  duration?: number;
}
