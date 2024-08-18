import { SeatState } from "../enums/seat-state.enum";

export interface Carriage {
    code: string;
    name: string;
    rows: number;
    leftSeats: number;
    rightSeats: number;
    seats: CarSeat[];
}

export interface CarSeat {
    number: number;
    state: SeatState;
}