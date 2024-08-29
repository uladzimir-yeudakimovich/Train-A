import { inject } from '@angular/core';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { SearchService } from '@home/services/search.service';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';

import { searchConfig } from './search.config';

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withEntities(searchConfig),

  withMethods((store, searchService = inject(SearchService)) => ({
    async searchRoutes(searchRoutesParams: SearchRoutesParams) {
      const response =
        await searchService.getAvailableRoutes(searchRoutesParams);
      console.log('response', response);

      patchState(store, setAllEntities(response, searchConfig));
    },
  })),
);
