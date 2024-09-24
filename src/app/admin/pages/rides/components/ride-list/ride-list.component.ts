import { RidesStore } from '@admin/store/rides/ride.store';
import { Component, inject, viewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { RideCardComponent } from '../ride-card/ride-card.component';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [
    RideCardComponent,
    MatProgressSpinner,
    MatExpansionModule,
    MatButton,
  ],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss',
})
export class RideListComponent {
  store = inject(RidesStore);

  accordion = viewChild.required(MatAccordion);
}
