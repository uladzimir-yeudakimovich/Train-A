import { Segment } from '@admin/interfaces';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
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
  // HTTP

  http = inject(HttpClient);

  rideId = input.required<number>();

  stations = input.required<string[]>();

  segments = input.required<Segment[]>();

  prices = computed(() => {
    return this.segments().map((segment) =>
      Object.entries(segment.price).map(([type, value]) => ({ type, value })),
    );
  });

  editMode = signal({
    departure: false,
    arrival: false,
    price: false,
  });

  toggleEdit = (index: number, type: 'departure' | 'arrival' | 'price') => {
    console.log(index, type);
    this.editMode()[type] = !this.editMode()[type];
  };
}
