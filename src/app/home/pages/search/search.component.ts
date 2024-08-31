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
import { SearchFormComponent } from './components/search-form/search-form.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchFormComponent, SearchCardsComponent],
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
      console.log(correctRide);

      return correctRide;
    });
  });

  ngOnInit(): void {
    this.stationStore.getStations();
  }
}
