import { StationStore } from '@admin/store/stations/stations.store';
import { Component, inject, OnInit } from '@angular/core';

import { SearchCardsComponent } from './components/search-cards/search-cards.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchFormComponent, SearchCardsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private stationStore = inject(StationStore);

  stations = this.stationStore.stationsEntities;

  ngOnInit(): void {
    this.stationStore.getStations();
  }
}
