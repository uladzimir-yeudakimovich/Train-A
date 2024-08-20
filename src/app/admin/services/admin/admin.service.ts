import { RailRoute } from '@admin/models/route.model';
import { Station } from '@admin/models/station.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getStations(): Promise<Station[]> {
    return firstValueFrom(this.http.get<Station[]>('station'));
  }

  deleteStation(id: number): Promise<Station> {
    return firstValueFrom(this.http.delete<Station>(`station/${id}`));
  }

  getRoutes(): Promise<RailRoute[]> {
    return firstValueFrom(this.http.get<RailRoute[]>('route'));
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
    const params = { id };
    return firstValueFrom(this.http.delete('route', { params }));
  }

  getCarriages(): Promise<Carriage[]> {
    return firstValueFrom(this.http.get<Carriage[]>('carriage'));
  }
}
