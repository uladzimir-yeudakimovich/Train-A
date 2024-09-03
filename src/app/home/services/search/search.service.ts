import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchCard } from '@home/models/search-card.model';
import { SearchResponse } from '@home/models/search-response.model';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { toSearchResult } from '@home/utils/toSearchResult';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { Order } from '@shared/models/interfaces/order.model';
import { Ride } from '@shared/models/interfaces/ride.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { ProfileService } from '@user/services/profile.service';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private carriageStore = inject(CarriageStore);

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
  ) {
    this.carriageStore.getCarriages();
  }

  loadRide(id: number): Promise<Ride> {
    return firstValueFrom(this.http.get<Ride>(`${ApiPath.Search}/${id}`)).catch(
      () => {
        // Ride not found
        return {} as Ride;
      },
    );
  }

  loadOrders(): Promise<Order[]> {
    const isManager = this.profileService.userRole() === 'manager';
    const attr = isManager ? '?all=true' : '';
    return firstValueFrom(
      this.http.get<Order[]>(`${ApiPath.Order}${attr}`),
    ).catch((error) => {
      throw error;
    });
  }

  cancelOrder(orderId: number): Promise<object> {
    return firstValueFrom(
      this.http.delete(`${ApiPath.Order}/${orderId}`),
    ).catch((error) => {
      throw error;
    });
  }

  postOrder(
    rideId: number,
    seat: number,
    stationStart: number,
    stationEnd: number,
  ): Promise<object> {
    const body = {
      rideId,
      seat,
      stationStart,
      stationEnd,
    };
    return firstValueFrom(this.http.post(ApiPath.Order, body)).catch(
      (error) => {
        throw error;
      },
    );
  }

  getAvailableRoutes(
    searchRoutesParams: SearchRoutesParams,
  ): Promise<SearchCard[]> {
    const params = new HttpParams({ fromObject: { ...searchRoutesParams } });

    return firstValueFrom(
      this.http.get<SearchResponse>(ApiPath.Search, { params }).pipe(
        map((data) => {
          const carriageTypes = this.carriageStore.carriagesEntities();
          return toSearchResult(data, carriageTypes);
        }),
      ),
    );
  }
}
