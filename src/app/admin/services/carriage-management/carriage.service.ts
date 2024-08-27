import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  constructor(private http: HttpClient) {}

  addCarriage(carriage: Carriage): Promise<object> {
    return firstValueFrom(this.http.post(ApiPath.Carriage, carriage)).catch(
      (error) => {
        throw error;
      },
    );
  }

  updateCarriage(carriage: Carriage): Promise<object> {
    return firstValueFrom(
      this.http.put(`${ApiPath.Carriage}/${carriage.code}`, carriage),
    ).catch((error) => {
      throw error;
    });
  }
}
