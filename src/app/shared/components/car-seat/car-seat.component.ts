import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';

@Component({
  selector: 'app-car-seat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-seat.component.html',
  styleUrl: './car-seat.component.scss'
})
export class CarSeatComponent {
  seat = input.required<CarSeat>();
  @Input() direction!: string;
  select = output<number>();

  public get SeatState() {
    return SeatState;
  }

  public onSeatClick() {
    if (this.seat().state === SeatState.Reserved) {
      return;
    }
    this.select.emit(this.seat().number);
  }
}
