import { RidesStore } from '@admin/store/ride.store';
import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { RideCardComponent } from '../ride-card/ride-card.component';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [RideCardComponent, MatProgressSpinner],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss',
})
export class RideListComponent {
  store = inject(RidesStore);
}
