import { Component, computed, HostListener, input, OnInit, signal } from '@angular/core';
import { CarSeatComponent } from '../car-seat/car-seat.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { TrainCarService } from '@shared/services/train-car.service';

@Component({
  selector: 'app-train-car',
  standalone: true,
  imports: [CarSeatComponent],
  templateUrl: './train-car.component.html',
  styleUrl: './train-car.component.scss',
})
export class TrainCarComponent implements OnInit {
  carriage = input.required<Carriage>();
  isHorizontal = signal<boolean>(false);
  seats = computed(() => {
    if (this.isHorizontal()) {
      return this.carriage().seats;
    }
    return this.carriage().sortedSeats;
  });

  constructor(private trainCarService: TrainCarService) {}

  ngOnInit() {
    this.isHorizontal.set(window.innerWidth > 992);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isHorizontal.set(window.innerWidth > 992);
  }
  
  toggleSeatState(seatNumber: number) {
    this.trainCarService.toggleSeatState(this.carriage(), seatNumber);
  }
  
  get availableSeatsNumber(): number {
    return this.trainCarService.getAvailableSeatsNumber(this.carriage());
  }
  
  getSeatDirection(seatNumber: number): string {
    return this.trainCarService.getSeatDirection(this.carriage(), seatNumber, this.isHorizontal());
  }

  isLastInRow(seatIndex: number): boolean {
    return this.trainCarService.isLastInRow(this.carriage(), seatIndex, this.isHorizontal());
  }

  isCorridor(seatIndex: number): boolean {
    return this.trainCarService.isCorridor(this.carriage(), seatIndex, this.isHorizontal());
  }
}
