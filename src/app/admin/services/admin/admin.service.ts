import { Station } from '@admin/models/station.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
