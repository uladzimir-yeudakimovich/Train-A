import { inject } from '@angular/core';
import { SearchCard } from '@home/models/search-card.model';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { SearchService } from '@home/services//search/search.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';

import { searchConfig } from './search.config';

const initialState = {
  time: 0,
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities(searchConfig),

  withMethods((store, searchService = inject(SearchService)) => ({
    async searchRoutes(searchRoutesParams: SearchRoutesParams) {
      this.setFilter(0);

      const response =
        await searchService.getAvailableRoutes(searchRoutesParams);
      // do not save rides before the selected date
      const filteredResponse = response
        .filter((ride) => {
          return ride.rideFrom.time.getTime() / 1000 >= searchRoutesParams.time;
        })
        .sort((a, b) => a.rideFrom.time.getTime() - b.rideFrom.time.getTime());
      patchState(store, setAllEntities(filteredResponse, searchConfig));
    },

    setFilter(time: number) {
      patchState(store, { time });
    },

    clear() {
      patchState(store, setAllEntities([] as SearchCard[], searchConfig));
    },
  })),
);
