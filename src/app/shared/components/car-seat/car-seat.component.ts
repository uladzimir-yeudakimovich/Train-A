import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';

@Component({
  selector: 'app-car-seat',
  standalone: true,
  imports: [NgClass],
  templateUrl: './car-seat.component.html',
  styleUrl: './car-seat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
