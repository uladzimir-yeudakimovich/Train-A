import { RailRoute } from '@admin/models/route.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementService {
  constructor(private http: HttpClient) {}

  getRoutes(): RailRoute[] {
    return [];
  }

  postRoute(route: RailRoute) {
    return;
  }

  updateRoute(id: number, route: Partial<RailRoute>) {
    return;
  }

  deleteRoute(id: number) {
    return;
  }
}
