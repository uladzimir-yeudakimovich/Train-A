import { RidesStore } from '@admin/store/rides/ride.store';
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
    return this.rideSegments().map(() => {
      const defaultPrice: Record<string, number> = {};

      this.carriageTypes().forEach((carriageType) => {
        defaultPrice[carriageType] = 0;
      });

      return {
        time: {
          departure: { date: '', time: '12:00' },
          arrival: { date: '', time: '12:00' },
        },
        price: defaultPrice,
      };
    });
  });

  formVisible = model(false);

  onDepartureDateChange(segmentIndex: number, value: string): void {
    this.segmentsForSubmit()[segmentIndex].time.departure.date = value;
  }

  onDepartureTimeChange(segmentIndex: number, value: string): void {
    this.segmentsForSubmit()[segmentIndex].time.departure.time = value;
  }

  onArrivalDateChange(segmentIndex: number, value: string): void {
    this.segmentsForSubmit()[segmentIndex].time.arrival.date = value;
  }

  onArrivalTimeChange(segmentIndex: number, value: string): void {
    this.segmentsForSubmit()[segmentIndex].time.arrival.time = value;
  }

  onPriceChange(segmentIndex: number, type: string, value: string): void {
    this.segmentsForSubmit()[segmentIndex].price[type] = Number(value);
  }

  onCreateButtonClick(): void {
    this.formVisible.set(false);

    this.ridesStore.createRide(
      this.ridesStore.routeId(),
      this.segmentsForSubmit(),
    );
  }

  areAllFieldsFilled(): boolean {
    return this.segmentsForSubmit().every((segment) => {
      return (
        segment.time.departure.date &&
        segment.time.departure.time &&
        segment.time.arrival.date &&
        segment.time.arrival.time
      );
    });
  }

  onCancelButtonClick(): void {
    this.formVisible.set(false);
  }
}
