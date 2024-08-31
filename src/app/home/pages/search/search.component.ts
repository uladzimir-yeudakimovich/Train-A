import { StationStore } from '@admin/store/stations/stations.store';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { SearchStore } from '@home/store/search.store';

import { SearchCardsComponent } from './components/search-cards/search-cards.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchFormComponent, SearchCardsComponent, SearchFilterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private stationStore = inject(StationStore);

  private searchStore = inject(SearchStore);

  stations = this.stationStore.stationsEntities;

  cards = computed(() => {
    const stationsMap = this.stationStore.stationsEntityMap();

    return this.searchStore.searchEntities().map((ride) => {
      const correctRide = ride;

      const correctRideRoute = ride.rideRoute
        .filter((point) => stationsMap[point.stationId])
        .map((correctPoint) => {
          const newPoint = correctPoint;

          newPoint.stationName = stationsMap[correctPoint.stationId].city;

          return newPoint;
        });

      correctRide.rideRoute = correctRideRoute;

      return correctRide;
    });
  });

  dates = computed(() =>
    [
      ...new Set(
        this.cards().map(({ rideFrom }) =>
          new Date(rideFrom.time).setHours(0, 0, 0, 0),
        ),
      ),
    ].sort((a, b) => a - b),
  );

  filteredCards = computed(() =>
    this.searchStore
      .searchEntities()
      .filter(
        ({ rideFrom }) =>
          !this.searchStore.time() ||
          rideFrom.time.setHours(0, 0, 0, 0) === this.searchStore.time(),
      ),
  );

  ngOnInit(): void {
    this.stationStore.getStations();
  }
}
