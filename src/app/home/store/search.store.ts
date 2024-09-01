import { inject } from '@angular/core';
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
      const response =
        await searchService.getAvailableRoutes(searchRoutesParams);
      // do not save rides before the selected date
      const filteredResponse = response.filter((ride) => {
        return ride.rideFrom.time.getTime() / 1000 >= searchRoutesParams.time;
      });
      patchState(store, setAllEntities(filteredResponse, searchConfig));
    },

    setFilter(time: number) {
      patchState(store, { time });
    },
  })),
);
