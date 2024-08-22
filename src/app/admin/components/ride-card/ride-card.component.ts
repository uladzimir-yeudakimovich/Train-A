import { Segment } from '@admin/interfaces';
import { DatePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [DatePipe, MatMiniFabButton, MatIcon],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent {
  rideId = input.required<number>();

  stations = input.required<string[]>();

  segments = input.required<Segment[]>();

  prices = computed(() => {
    return this.segments().map((segment) =>
      Object.entries(segment.price).map(([type, value]) => ({ type, value })),
    );
  });

  editMode = computed(() => {
    return this.segments().map(() => signal({ departure: false, arrival: false, price: false }));
  });

  toggleEditMode(index: number, type: 'departure' | 'arrival' | 'price'): void {
    this.editMode()[index].update((value) => ({ ...value, [type]: !value[type] }));
  }

  getDateFromISO(isoString: string): string {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  }

  getTimeFromISO(isoString: string): string {
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5);
  }

  onDepartureDateInput(segmentIndex: number, value: string): void {
    this.segments()[segmentIndex].time[0] = value;
  }

  onArrivalDateInput(segmentIndex: number, value: string): void {
    this.segments()[segmentIndex].time[1] = value;
  }

  onPriceInput(segmentIndex: number, priceIndex: number, type: string, value: string): void {
    this.prices()[segmentIndex][priceIndex].value = Number(value);
    this.segments()[segmentIndex].price[type] = Number(value);
  }
}
