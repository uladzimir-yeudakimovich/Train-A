import { inject } from '@angular/core';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { SearchService } from '@home/services/search.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

const initialState: SearchResponse = {
  from: null,
  routes: [],
  to: null,
};

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, searchService = inject(SearchService)) => ({
    async searchRoutes(searchRoutesParams: SearchRoutesParams) {
      const response =
        await searchService.getAvailableRoutes(searchRoutesParams);

      patchState(store, response);
    },
  })),
);
