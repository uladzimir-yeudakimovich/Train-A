import { Component, inject, Input, OnInit, Signal } from '@angular/core';
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
  @Input() carriageCode!: string;
  // onSeatClick = output<number>();

  carriage!: Signal<Carriage>;

  store = inject(CarriagesStore);

  ngOnInit(): void {
    this.store.initState(); // TEST
    // this.carriage = this.store.getCarriage(this.carriageCode());
    this.carriage = this.store.getCarriageSignal(this.carriageCode);
  }

  onSeatSelect(seatNumber: number) {
    // this.onSeatClick.emit(seatNumber);
    const seat = this.carriage().seats.find((s) => s.number === seatNumber);
    const newState = seat?.state === SeatState.Selected ? SeatState.Available : SeatState.Selected;
    this.store.updateSeatState(this.carriageCode, seatNumber, newState);
  }
}