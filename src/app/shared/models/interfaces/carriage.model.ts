import { SeatState } from '../enums/seat-state.enum';

export interface CarSeat {
  number: number;
  state: SeatState;
}

export interface Carriage {
  code: string;

  name: string;

  rows: number;

  leftSeats: number;

  rightSeats: number;

  seats: CarSeat[];
}
