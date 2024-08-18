import { Schedule } from './schedule.interface';

export interface Ride {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: Schedule;
}
