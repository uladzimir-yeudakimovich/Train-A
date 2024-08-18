import { SeatState } from "../enums/seat-state.enum";

export class Carriage {
    code: string;
    name: string;
    rows: number;
    leftSeats: number;
    rightSeats: number;
    seats: CarSeat[];

    constructor(code: string, name: string, rows: number, leftSeats: number, rightSeats: number) {
        this.code = code;
        this.name = name;
        this.rows = rows;
        this.leftSeats = leftSeats;
        this.rightSeats = rightSeats;
        
        this.seats = [];
        const cols = leftSeats + rightSeats;
        for (let i = 0; i < rows * cols; i++) {
            const row = i % rows;
            const col = Math.floor(i / rows);
            const seatNumber = (row + 1) * cols - col;
            this.seats.push({ number: seatNumber, state: SeatState.Available });
        }
    }
}

export interface CarSeat {
    number: number;
    state: SeatState;
}