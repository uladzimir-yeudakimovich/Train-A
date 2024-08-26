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
  schedule: Segment[];
}
