import { Component, input } from '@angular/core';
import { SearchCard } from '@home/models/search-card.model';

import { searchFilterImports } from './search-filter.config';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: searchFilterImports,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  filters = input.required({
    alias: 'cards',
    transform: (value: SearchCard[]) =>
      [
        ...new Set(
          value.map(({ rideFrom }) =>
            new Date(rideFrom.time).setHours(0, 0, 0, 0),
          ),
        ),
      ].sort((a, b) => a - b),
  });
}
