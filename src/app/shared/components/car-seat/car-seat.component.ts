import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { SeatState } from '@shared/models/enums/seat-state.enum';

@Component({
  selector: 'app-car-seat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-seat.component.html',
  styleUrl: './car-seat.component.scss'
})
export class CarSeatComponent {
  @Input() number!: number;
  state = input<SeatState>();
  select = output<number>();

  public get SeatState() {
    return SeatState;
  }

  public onSeatClick() {
    if (this.state() === SeatState.Reserved) {
      return;
    }
    this.select.emit(this.number);
  }
}
