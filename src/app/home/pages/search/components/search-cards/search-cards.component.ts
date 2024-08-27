import { Component, inject } from '@angular/core';
import { HomeStore } from '@home/store/home.store';

import { searchCardsImports } from './search-cards.config';

@Component({
  selector: 'app-search-cards',
  standalone: true,
  imports: searchCardsImports,
  templateUrl: './search-cards.component.html',
  styleUrl: './search-cards.component.scss',
})
export class SearchCardsComponent {
  private homeStore = inject(HomeStore);

  routes = this.homeStore.routes;

  to = this.homeStore.to;

  from = this.homeStore.from;
}
