import { Component, input, output } from '@angular/core';
import { CarSeatComponent } from '../car-seat/car-seat.component';

@Component({
  selector: 'app-train-car',
  standalone: true,
  imports: [CarSeatComponent],
  templateUrl: './train-car.component.html',
  styleUrl: './train-car.component.scss'
})
export class TrainCarComponent {
  carriageCode = input<string>();
  onSeatClick = output<number>();
}
