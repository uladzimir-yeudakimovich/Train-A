import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';

@Component({
  selector: 'app-car-seat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-seat.component.html',
  styleUrl: './car-seat.component.scss',
})
export class CarSeatComponent {
  seat = input.required<CarSeat>();

  direction = input.required<string>();

  select = output<number>();

  onSeatClick() {
    if (this.seat().state === SeatState.Reserved) {
      return;
    }
    this.select.emit(this.seat().number);
  }

  get SeatState() {
    return SeatState;
  }
}
