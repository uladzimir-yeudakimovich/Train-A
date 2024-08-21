import { RailRoute } from '@admin/models/route.model';
import { Station } from '@admin/models/station.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly loadRoutes = this.getRoutes();

  readonly loadStations = this.getStations();

  readonly loadCarriages = this.getCarriages();

  constructor(private http: HttpClient) {}

  deleteStation(id: number): Promise<Station> {
    return firstValueFrom(this.http.delete<Station>(`station/${id}`));
  }

  postRoute(route: Partial<RailRoute>): Promise<object> {
    const body = {
      path: route.path,
      carriages: route.carriages,
    };
    return firstValueFrom(this.http.post('route', body));
  }

  updateRoute(id: number, route: Partial<RailRoute>): Promise<object> {
    const body = { ...route };
    const params = { id };
    return firstValueFrom(this.http.put('route', body, { params }));
  }

  deleteRoute(id: number): Promise<object> {
    return firstValueFrom(this.http.delete(`route/${id}`));
  }

  private getStations() {
    let isLoading = false;
    return () => {
      if (isLoading) {
        return Promise.resolve([]);
      }
      isLoading = true;
      return firstValueFrom(this.http.get<Station[]>('station')).finally(() => {
        isLoading = false;
      });
    };
  }

  private getRoutes() {
    let isLoading = false;

    return (): Promise<RailRoute[]> => {
      if (isLoading) {
        return Promise.resolve([]);
      }
      isLoading = true;
      return firstValueFrom(this.http.get<RailRoute[]>('route')).finally(() => {
        isLoading = false;
      });
    };
  }

  private getCarriages() {
    let isLoading = false;
    return () => {
      if (isLoading) {
        return Promise.resolve([]);
      }
      isLoading = true;
      return firstValueFrom(this.http.get<Carriage[]>('carriage')).finally(
        () => {
          isLoading = false;
        },
      );
    };
  }
}
