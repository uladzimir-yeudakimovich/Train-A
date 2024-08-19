import { Component, computed, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { CarSeatComponent } from '../car-seat/car-seat.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriagesStore } from '@shared/store/carriages.store';
import { SeatState } from '@shared/models/enums/seat-state.enum';

@Component({
  selector: 'app-train-car',
  standalone: true,
  imports: [CarSeatComponent],
  templateUrl: './train-car.component.html',
  styleUrl: './train-car.component.scss',
})
export class TrainCarComponent implements OnInit {
  carriage = input.required<Carriage>();
  isHorizontal = signal<boolean>(false);
  store = inject(CarriagesStore);

  seats = computed(() => {
    if (this.isHorizontal()) {
      return this.carriage().seats;
    }
    return this.carriage().sortedSeats;
  });

  ngOnInit() {
    this.isHorizontal.set(window.innerWidth > 992);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isHorizontal.set(window.innerWidth > 992);
  }

  toggleSeatState(seatNumber: number) {
    const seat = this.carriage().seats.find((s) => s.number === seatNumber)!;
    const newState = seat.state === SeatState.Selected ? SeatState.Available : SeatState.Selected;
    this.store.updateSeat(this.carriage(), { ...seat, state: newState });
  }

  getSeatDirection(seatNumber: number): string {
    const { leftSeats, rightSeats, rows } = this.carriage();
    const totalSeatsPerRow = leftSeats + rightSeats;
    const isFirstRow = seatNumber <= totalSeatsPerRow;
    const isLastRow = seatNumber > totalSeatsPerRow * (rows - 1);

    if (isFirstRow) {
      return this.adjustDirectionForOrientation('right');
    }
    if (isLastRow) {
      return this.adjustDirectionForOrientation('left');
    }

    const isLeftSeat = (seatNumber - 1) % totalSeatsPerRow < leftSeats;
    return this.adjustDirectionForOrientation(isLeftSeat ? 'left' : 'right');
  }

  private adjustDirectionForOrientation(direction: 'left' | 'right'): string {
    if (this.isHorizontal()) {
      return direction;
    }
    return direction === 'left' ? 'bottom' : 'top';
  }

  isLastInRow(seatIndex: number): boolean {
    const car = this.carriage();
    if (this.isHorizontal()) {
      return (seatIndex + 1) % car.rows === 0;  
    }
    return (seatIndex + 1) % car.cols === 0;
  }

  isCorridor(seatIndex: number): boolean {
    const car = this.carriage();
    if (this.isHorizontal()) {
      return (seatIndex + 1) === car.rows * car.rightSeats;
    }
    return (seatIndex + 1) % car.cols === car.leftSeats; 
  }
}
