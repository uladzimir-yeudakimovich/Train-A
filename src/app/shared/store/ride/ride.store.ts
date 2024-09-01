import { inject } from '@angular/core';
import { SearchService } from '@home/services/search/search.service';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';

import { rideConfig } from './ride.config';

export const RideStore = signalStore(
  { providedIn: 'root' },

  withEntities(rideConfig),

  withMethods((store, searchService = inject(SearchService)) => ({
    async getRide(id: number) {
      if (!store.ridesEntityMap()[id]) {
        const ride = await searchService.loadRide(id);
        patchState(store, setEntity(ride, rideConfig));
      }
    },
  })),
);
