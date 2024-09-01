import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchCard } from '@home/models/search-card.model';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { toSearchResult } from '@home/utils/toSearchResult';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAvailableRoutes(
    searchRoutesParams: SearchRoutesParams,
  ): Promise<SearchCard[]> {
    const params = new HttpParams({ fromObject: { ...searchRoutesParams } });

    return firstValueFrom(
      this.http
        .get<SearchResponse>(ApiPath.Search, { params })
        // ! add error handling
        .pipe(map((data) => toSearchResult(data))),
    );
  }
}
