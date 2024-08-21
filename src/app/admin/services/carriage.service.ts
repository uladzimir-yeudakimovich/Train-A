import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Carriage } from '@admin/pages/carriages/carriage.model';

@Injectable({
  providedIn: 'root'
})
export class CarriageService {
  private baseUrl = 'carriage';

  constructor(private http: HttpClient) {}

  loadCarriages(): Observable<Carriage[]> {
    return this.http.get<Carriage[]>(this.baseUrl);
  }

  addCarriage(carriage: Carriage): Observable<Carriage> {
    return this.http.post<Carriage>(this.baseUrl, carriage).pipe(
      map(newCarriage => {
        return newCarriage;
      }),
      catchError(error => {
        console.error('Failed to add carriage', error);
        throw error;
      })
    );
  }

  updateCarriage(carriage: Carriage): Observable<Carriage> {
    return this.http.put<Carriage>(`${this.baseUrl}/${carriage.code}`, carriage).pipe(
      map(updatedCarriage => {
        return updatedCarriage;
      }),
      catchError(error => {
        console.error('Failed to update carriage', error);
        throw error;
      })
    );
  }
}
