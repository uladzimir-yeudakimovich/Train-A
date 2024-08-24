import { Component, inject, input } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { TripStore } from '@home/store/trip/trip.store';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [MatList, MatListItem, TrainCarComponent],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
})
export class CarriageListComponent {
  carriages = input.required<Carriage[]>();

  tripStore = inject(TripStore);

  onToggleSeat(seatNumber: number, carCode: string) {
    this.tripStore.toggleSeatState(carCode, seatNumber);
  }
}
