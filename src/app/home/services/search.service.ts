import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFormValue } from '@home/models/search-form.model';
import { SearchParams } from '@home/models/search-params.model';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAvailableRoutes(
    searchParams: SearchParams,
  ): Observable<SearchFormValue[]> {
    const params = new HttpParams({ fromObject: { ...searchParams } });

    return this.http.get<SearchFormValue[]>(ApiPath.Search, { params });
  }
}
