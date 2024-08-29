import { Component, input } from '@angular/core';
import { SearchCard } from '@home/models/search-card.model';

import { searchCardsImports } from './search-cards.config';

@Component({
  selector: 'app-search-cards',
  standalone: true,
  imports: searchCardsImports,
  templateUrl: './search-cards.component.html',
  styleUrl: './search-cards.component.scss',
})
export class SearchCardsComponent {
  cards = input.required<SearchCard[]>();
}
