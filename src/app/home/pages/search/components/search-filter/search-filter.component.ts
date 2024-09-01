import { Component, inject, input } from '@angular/core';
import { SearchStore } from '@home/store/search.store';

import { searchFilterImports } from './search-filter.config';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: searchFilterImports,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  private searchStore = inject(SearchStore);

  dates = input.required<number[]>();

  filterTime(index: number) {
    if (index === 0) {
      this.searchStore.setFilter(0);
      return;
    }
    this.searchStore.setFilter(this.dates()[index - 1]);
  }
}
