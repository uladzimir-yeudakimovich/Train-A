import { RailRoute, Station } from '@admin/models/route.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementService {
  constructor(private http: HttpClient) {}

  async getRoutes(): Promise<RailRoute[]> {
    const routes = await firstValueFrom(this.http.get<RailRoute[]>('route'));
    return routes;
  }

  async postRoute(route: RailRoute) {
    const body = {
      path: route.path,
      carriages: route.carriages
    };
    await firstValueFrom(this.http.post('route', body));
  }

  async updateRoute(id: number, route: Partial<RailRoute>) {
    const params = { id: id.toString() };
    const body = { ...route };
    await firstValueFrom(this.http.put('route', body, { params }));
  }

  async deleteRoute(id: number) {
    const params = { id: id.toString() };
    await firstValueFrom(this.http.delete('route', { params }));
  }

  async getStations(stationIds: number[]): Promise<Station[]> {
    const stations = await firstValueFrom(this.http.get<Station[]>('station'));
    return stations.filter(station => stationIds.includes(station.id));
  }

  async getStationCities(stationIds: number[]): Promise<string[]> {
    const stations = await this.getStations(stationIds);
    return stations.map(station => station.city);
  }
}
