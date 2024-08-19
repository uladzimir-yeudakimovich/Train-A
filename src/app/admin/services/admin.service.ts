import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StationInterface } from '@admin/models/station.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<StationInterface[]> {
    return this.http.get<StationInterface[]>('station');
  }
}
