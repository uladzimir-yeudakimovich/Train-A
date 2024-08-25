import { Injectable } from '@angular/core';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';

@Injectable()
export class TrainCarService {
  getAvailableSeatsNumber(carriage: Carriage): number {
    return carriage.seats.filter((s) => s.state !== SeatState.Reserved).length;
  }

  getSeatDirection(
    carriage: Carriage,
    seatNumber: number,
    isHorizontal: boolean,
  ): string {
    const { leftSeats, rightSeats, rows } = carriage;
    const totalSeatsPerRow = leftSeats + rightSeats;
    const isFirstRow = seatNumber <= totalSeatsPerRow;
    const isLastRow = seatNumber > totalSeatsPerRow * (rows - 1);

    if (isFirstRow) {
      return this.adjustDirectionForOrientation('right', isHorizontal);
    }
    if (isLastRow) {
      return this.adjustDirectionForOrientation('left', isHorizontal);
    }

    const isLeftSeat = (seatNumber - 1) % totalSeatsPerRow < leftSeats;
    return this.adjustDirectionForOrientation(
      isLeftSeat ? 'left' : 'right',
      isHorizontal,
    );
  }

  isLastInRow(
    carriage: Carriage,
    seatIndex: number,
    isHorizontal: boolean,
  ): boolean {
    const cols = carriage.leftSeats + carriage.rightSeats;
    if (isHorizontal) {
      return (seatIndex + 1) % carriage.rows === 0;
    }
    return (seatIndex + 1) % cols === 0;
  }

  isCorridor(
    carriage: Carriage,
    seatIndex: number,
    isHorizontal: boolean,
  ): boolean {
    const cols = carriage.leftSeats + carriage.rightSeats;
    if (isHorizontal) {
      return seatIndex + 1 === carriage.rows * carriage.rightSeats;
    }
    return (seatIndex + 1) % cols === carriage.leftSeats;
  }

  private adjustDirectionForOrientation(
    direction: 'left' | 'right',
    isHorizontal: boolean,
  ): string {
    if (isHorizontal) {
      return direction;
    }
    return direction === 'left' ? 'bottom' : 'top';
  }
}
