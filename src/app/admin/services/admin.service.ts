import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StationInterface } from '@admin/models/station.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getStations(): Promise<StationInterface[]> {
    return firstValueFrom(this.http.get<StationInterface[]>('station'));
  }

  deleteStation(id: number): Promise<StationInterface> {
    return firstValueFrom(this.http.delete<StationInterface>(`station/${id}`));
  }
}
