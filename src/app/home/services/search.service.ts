import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchCard } from '@home/models/search-card.model';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { toSearchResult } from '@home/utils/toSearchResult';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private carriageStore = inject(CarriageStore);

  constructor(private http: HttpClient) {
    this.carriageStore.getCarriages();
  }

  getAvailableRoutes(
    searchRoutesParams: SearchRoutesParams,
  ): Promise<SearchCard[]> {
    const params = new HttpParams({ fromObject: { ...searchRoutesParams } });

    return firstValueFrom(
      this.http.get<SearchResponse>(ApiPath.Search, { params }).pipe(
        map((data) => {
          const carriageTypes = this.carriageStore.carriagesEntities();
          return toSearchResult(data, carriageTypes);
        }),
      ),
    );
  }
}
