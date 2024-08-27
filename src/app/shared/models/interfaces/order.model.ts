import { Segment } from './ride.model';

export enum OrderStatus {
  Active = 'active',
  Completed = 'completed',
  Rejected = 'rejected',
  Canceled = 'canceled',
}

export interface Order {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: OrderStatus;
  path: number[];
  carriages: string[];
  schedule: {
    segments: Segment[];
  };
}

export interface OrderView {
  id: number;
  status: OrderStatus;
  startStation: string;
  startTime: string;
  endStation: string;
  endTime: string;
  tripDuration: string;
  carType: string;
  carNumber: number;
  seatNumber: number;
  price: number;
}
