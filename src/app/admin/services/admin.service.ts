import { Station } from '@admin/models/station.model';
import { StationFormData } from '@admin/models/station-form.model';
import { mapFromIdToStation } from '@admin/utils/mapFromIdToStation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getStations(): Promise<Station[]> {
    return firstValueFrom(this.http.get<Station[]>('station'));
  }

  deleteStation(id: number): Promise<Station> {
    return firstValueFrom(this.http.delete<Station>(`station/${id}`));
  }

  postStation(body: StationFormData): Promise<Station> {
    return firstValueFrom(
      this.http
        .post<{ id: number }>('station', body)
        .pipe(map((data) => mapFromIdToStation(data, body))),
    );
  }
}
