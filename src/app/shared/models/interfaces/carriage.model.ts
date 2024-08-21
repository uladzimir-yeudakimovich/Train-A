import { SeatState } from '../enums/seat-state.enum';

export interface CarSeat {
  number: number;
  state: SeatState;
}

export class Carriage {
  code: string;

  name: string;

  rows: number;

  leftSeats: number;

  rightSeats: number;

  seats: CarSeat[];

  constructor(
    code: string,
    name: string,
    rows: number,
    leftSeats: number,
    rightSeats: number,
  ) {
    this.code = code;
    this.name = name;
    this.rows = rows;
    this.leftSeats = leftSeats;
    this.rightSeats = rightSeats;
    this.seats = this.initializeSeats();
  }

  private initializeSeats(): CarSeat[] {
    const seats: CarSeat[] = [];
    const cols = this.leftSeats + this.rightSeats;

    for (let i = 0; i < this.rows * cols; i += 1) {
      const row = i % this.rows;
      const col = Math.floor(i / this.rows);
      const seatNumber = (row + 1) * cols - col;
      seats.push({ number: seatNumber, state: SeatState.Available });
    }
    return seats;
  }
}
