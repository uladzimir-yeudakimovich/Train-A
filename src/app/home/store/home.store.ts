import { inject } from '@angular/core';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { SearchService } from '@home/services/search.service';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';

import { homeConfig } from './home.config';

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withEntities(homeConfig),

  withMethods((store, searchService = inject(SearchService)) => ({
    async searchRoutes(searchRoutesParams: SearchRoutesParams) {
      const response =
        await searchService.getAvailableRoutes(searchRoutesParams);
      console.log(response);
      patchState(store, setEntity(response, homeConfig));
    },
  })),
);
