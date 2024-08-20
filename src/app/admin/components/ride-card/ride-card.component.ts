import { Segment } from '@admin/interfaces';
import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [DatePipe],
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
}
