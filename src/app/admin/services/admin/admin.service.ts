import { RailRoute } from '@admin/models/route.model';
import { Station } from '@admin/models/station.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly loadRoutes = this.createLoader<RailRoute[]>(ApiPath.Route);

  readonly loadStations = this.createLoader<Station[]>(ApiPath.Station);

  readonly loadCarriages = this.createLoader<Carriage[]>(ApiPath.Carriage);

  constructor(private http: HttpClient) {}

  deleteStation(id: number): Promise<Station> {
    return firstValueFrom(
      this.http.delete<Station>(`${ApiPath.Station}/${id}`),
    );
  }

  postRoute(route: Partial<RailRoute>): Promise<object> {
    const body = {
      path: route.path,
      carriages: route.carriages,
    };
    return firstValueFrom(this.http.post(ApiPath.Route, body));
  }

  updateRoute(id: number, route: Partial<RailRoute>): Promise<object> {
    const body = { ...route };
    const params = { id };
    return firstValueFrom(this.http.put(ApiPath.Route, body, { params }));
  }

  deleteRoute(id: number): Promise<object> {
    return firstValueFrom(this.http.delete(`${ApiPath.Route}/${id}`));
  }

  private createLoader<T>(endpoint: string) {
    let isLoading = false;
    return (): Promise<T> => {
      if (isLoading) {
        return Promise.resolve([] as unknown as T);
      }
      isLoading = true;
      return firstValueFrom(this.http.get<T>(endpoint)).finally(() => {
        isLoading = false;
      });
    };
  }
}
