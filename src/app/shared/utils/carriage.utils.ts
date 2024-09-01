import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage, CarSeat } from '@shared/models/interfaces/carriage.model';

export function getSeats(
  carriage: Carriage,
  occupiedSeats?: number[],
): CarSeat[] {
  const seats: CarSeat[] = [];
  const cols = carriage.leftSeats + carriage.rightSeats;

  for (let i = 0; i < carriage.rows * cols; i += 1) {
    const row = i % carriage.rows;
    const col = Math.floor(i / carriage.rows);
    const seatNumber = (row + 1) * cols - col;
    seats.push({
      number: seatNumber,
      state: occupiedSeats?.includes(seatNumber)
        ? SeatState.Reserved
        : SeatState.Available,
    });
  }
  return seats;
}
