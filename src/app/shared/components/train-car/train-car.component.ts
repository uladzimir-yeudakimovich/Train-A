import { Component, inject, input } from '@angular/core';
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
export class TrainCarComponent {
  carriage = input.required<Carriage>();
  store = inject(CarriagesStore);

  toggleSeatState(seatNumber: number) {
    const seat = this.carriage().seats.find((s) => s.number === seatNumber)!;
    const newState = seat.state === SeatState.Selected ? SeatState.Available : SeatState.Selected;
    this.store.updateSeat(this.carriage(), { ...seat, state: newState });
  }
}