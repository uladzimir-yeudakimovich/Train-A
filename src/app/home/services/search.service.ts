import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAvailableRoutes(
    searchRoutesParams: SearchRoutesParams,
  ): Promise<SearchResponse> {
    const params = new HttpParams({ fromObject: { ...searchRoutesParams } });

    return firstValueFrom(
      this.http.get<SearchResponse>(ApiPath.Search, { params }),
    );
  }
}
