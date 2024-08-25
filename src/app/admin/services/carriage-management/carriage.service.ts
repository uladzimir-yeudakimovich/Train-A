import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {

  constructor(private http: HttpClient) {}

  addCarriage(carriage: Carriage): Observable<Carriage> {
    return this.http.post<Carriage>(ApiPath.Carriage, carriage).pipe(
      map((newCarriage) => {
        return newCarriage;
      }),
      catchError((error) => {
        throw error;
      }),
    );
  }

  updateCarriage(carriage: Carriage): Observable<Carriage> {
    return this.http
      .put<Carriage>(`${ApiPath.Carriage}/${carriage.code}`, carriage)
      .pipe(
        map((updatedCarriage) => {
          return updatedCarriage;
        }),
        catchError((error) => {
          throw error;
        }),
      );
  }
}
