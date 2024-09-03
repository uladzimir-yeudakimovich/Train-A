import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchCard } from '@home/models/search-card.model';

import { ScheduleComponent } from '../schedule/schedule.component';

import { searchCardsImports } from './search-cards.config';

@Component({
  selector: 'app-search-cards',
  standalone: true,
  imports: searchCardsImports,
  templateUrl: './search-cards.component.html',
  styleUrl: './search-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardsComponent {
  schedule = inject(MatDialog);

  cards = input.required<SearchCard[]>();

  openModal(event: Event, card: SearchCard): void {
    event.preventDefault();
    event.stopPropagation();

    const { rideId, rideRoute, rideFrom, rideTo } = card;

    const data = {
      title: `Route ${rideId}`,
      stations: rideRoute,
      from: rideFrom.city,
      to: rideTo.city,
    };

    this.schedule.open(ScheduleComponent, {
      data,
    });
  }

  tabClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
