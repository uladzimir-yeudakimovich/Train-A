import { Component, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { CarSeatComponent } from '../car-seat/car-seat.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriagesStore } from '@shared/store/carriages.store';
import { SeatState } from '@shared/models/enums/seat-state.enum';

@Component({
  selector: 'app-train-car',
  standalone: true,
  imports: [CarSeatComponent],
  templateUrl: './train-car.component.html',
  styleUrl: './train-car.component.scss'
})
export class TrainCarComponent implements OnInit {
  carriage = input.required<Carriage>();
  store = inject(CarriagesStore);

  isHorizontal = signal<boolean>(false);

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
    const cols = this.carriage().leftSeats + this.carriage().rightSeats;
    const rows = this.carriage().rows;
    if (seatNumber <= cols) {
      return this.modifySeatDirection('right');
    }
    if (seatNumber > cols*(rows - 1)) {
      return this.modifySeatDirection('left');
    }
    const isLeftSeat = (seatNumber - 1) % cols < this.carriage().leftSeats;
    return isLeftSeat ? this.modifySeatDirection('left') : this.modifySeatDirection('right');
  }

  private modifySeatDirection(direction: string): string {
    if (this.isHorizontal()) {
      return direction;
    }
    return direction === 'left' ? 'bottom' : 'top';
  }
}