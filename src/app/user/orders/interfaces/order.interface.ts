import { Schedule } from './schedule.interface';

export type OrderStatus = 'active' | 'completed' | 'rejected' | 'canceled';

export interface Order {
  id: number;
  userId: number;
  routeId: number;
  rideId: number;
  seatId: number;
  path: number[];
  carriages: string[];
  stationStart: number;
  stationEnd: number;
  schedule: Schedule;
  status: OrderStatus;
}
