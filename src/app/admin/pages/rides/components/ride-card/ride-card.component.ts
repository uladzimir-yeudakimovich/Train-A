import { SegmentUI } from '@admin/models/rides.model';
import { RidesStore } from '@admin/store/rides/ride.store';
import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '@shared/components/delete-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [DatePipe, MatMiniFabButton, MatIcon],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent {
  ridesStore = inject(RidesStore);

  rideId = input.required<number>();

  stations = input.required<string[]>();

  segments = input.required<SegmentUI[]>();

  dialog = inject(MatDialog);

  prices = computed(() => {
    return this.segments().map((segment) =>
      Object.entries(segment.price).map(([type, value]) => ({ type, value })),
    );
  });

  editMode = computed(() => {
    return this.segments().map(() =>
      signal({ departure: false, arrival: false, price: false }),
    );
  });

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ridesStore.deleteRide(this.rideId());
      }
    });
  }

  toggleEditMode(index: number, type: 'departure' | 'arrival' | 'price'): void {
    this.editMode()[index].update((value) => ({
      ...value,
      [type]: !value[type],
    }));
  }

  onDepartureDateInput(segmentIndex: number, value: string): void {
    this.segments()[segmentIndex].time.departure.date = value;
  }

  onDepartureTimeInput(segmentIndex: number, value: string): void {
    this.segments()[segmentIndex].time.departure.time = value;
  }

  onArrivalDateInput(segmentIndex: number, value: string): void {
    this.segments()[segmentIndex].time.arrival.date = value;
  }

  onArrivalTimeInput(segmentIndex: number, value: string): void {
    this.segments()[segmentIndex].time.arrival.time = value;
  }

  onPriceInput(
    segmentIndex: number,
    priceIndex: number,
    type: string,
    value: string,
  ): void {
    this.prices()[segmentIndex][priceIndex].value = Number(value);
    this.segments()[segmentIndex].price[type] = Number(value);
  }

  onSave(): void {
    this.editMode().forEach((edit) =>
      edit.set({ departure: false, arrival: false, price: false }),
    );
    this.ridesStore.updateRide(this.rideId());
  }
}
