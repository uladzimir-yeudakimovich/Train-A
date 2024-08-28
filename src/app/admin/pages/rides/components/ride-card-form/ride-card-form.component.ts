import { RidesStore } from '@admin/store/ride.store';
import { Component, computed, inject, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-ride-card-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton],
  templateUrl: './ride-card-form.component.html',
  styleUrl: './ride-card-form.component.scss',
})
export class RideCardFormComponent {
  ridesStore = inject(RidesStore);

  stations = computed(() => {
    return this.ridesStore.stations();
  });

  rideSegments = computed(() => {
    return this.ridesStore.schedule()[0].segments;
  });

  carriageTypes = computed(() => {
    return this.ridesStore.carriages();
  });

  segmentsForSubmit = computed(() => {
    return this.rideSegments().map(() => ({
      time: ['', ''],
      price: {} as Record<string, number>,
    }));
  });

  formVisible = model(false);

  onDepartureDateChange(segmentIndex: number, value: string): void {
    this.segmentsForSubmit()[segmentIndex].time[0] = value;
  }

  onArrivalDateChange(segmentIndex: number, value: string): void {
    this.segmentsForSubmit()[segmentIndex].time[1] = value;
  }

  onPriceChange(segmentIndex: number, type: string, value: string): void {
    this.segmentsForSubmit()[segmentIndex].price[type] = Number(value);
  }

  areAllInputsFilled(): boolean {
    return this.segmentsForSubmit().every((segment) => {
      const [departure, arrival] = segment.time;
      const allPricesFilled = Object.values(segment.price).every(
        (price) => price && price > 0,
      );
      return (
        departure.trim() !== '' && arrival.trim() !== '' && allPricesFilled
      );
    });
  }

  onCreateButtonClick(): void {
    this.formVisible.set(false);

    const segments = this.segmentsForSubmit().map((segment) => ({
      time: [
        new Date(segment.time[0]).toISOString(),
        new Date(segment.time[1]).toISOString(),
      ] as [string, string],
      price: segment.price,
    }));

    this.ridesStore.createRide(this.ridesStore.routeId(), segments);
  }

  onCancelButtonClick(): void {
    this.formVisible.set(false);
  }
}
