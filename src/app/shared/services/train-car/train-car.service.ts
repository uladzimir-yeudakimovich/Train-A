import { inject, Injectable } from '@angular/core';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriagesStore } from '@shared/store/carriages.store';

@Injectable()
export class TrainCarService {
  private carriagesStore = inject(CarriagesStore);

  toggleSeatState(carriage: Carriage, seatNumber: number): void {
    const seat = carriage.seats.find((s) => s.number === seatNumber)!;
    const isSelected = seat.state === SeatState.Selected;
    const newState = isSelected ? SeatState.Available : SeatState.Selected;

    this.carriagesStore.updateSeat(carriage, { ...seat, state: newState });
  }

  getAvailableSeatsNumber(carriage: Carriage): number {
    return this.carriagesStore.getAvailableSeatsNumber(carriage.code);
  }

  getSeatDirection(carriage: Carriage, seatNumber: number, isHorizontal: boolean): string {
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
    return this.adjustDirectionForOrientation(isLeftSeat ? 'left' : 'right', isHorizontal);
  }

  isLastInRow(carriage: Carriage, seatIndex: number, isHorizontal: boolean): boolean {
    if (isHorizontal) {
      return (seatIndex + 1) % carriage.rows === 0;
    }
    return (seatIndex + 1) % carriage.cols === 0;
  }

  isCorridor(carriage: Carriage, seatIndex: number, isHorizontal: boolean): boolean {
    if (isHorizontal) {
      return seatIndex + 1 === carriage.rows * carriage.rightSeats;
    }
    return (seatIndex + 1) % carriage.cols === carriage.leftSeats;
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
