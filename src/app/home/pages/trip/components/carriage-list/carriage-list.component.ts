import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Signal,
} from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { TripStore } from '@home/store/trip/trip.store';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { TrainCarService } from '@shared/services/train-car/train-car.service';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [MatList, MatListItem, TrainCarComponent],
  providers: [TrainCarService],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarriageListComponent {
  carriages = input.required<Carriage[]>();

  tripStore = inject(TripStore);

  availableCarriages!: Signal<Carriage[]>;

  constructor(private trainCarService: TrainCarService) {
    this.availableCarriages = computed(() => {
      return this.carriages().filter(
        (carriage) => !!this.trainCarService.getAvailableSeatsNumber(carriage),
      );
    });
  }

  onToggleSeat(seatNumber: number, carCode: string) {
    this.tripStore.toggleSeatState(carCode, seatNumber);
  }
}
