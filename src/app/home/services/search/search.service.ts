import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminRoleGuard } from '@core/guards/admin.guard';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { Order } from '@shared/models/interfaces/order.model';
import { Ride } from '@shared/models/interfaces/ride.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
    private adminGuard: AdminRoleGuard,
  ) {}

  loadRide(id: number): Promise<Ride> {
    return firstValueFrom(this.http.get<Ride>(`${ApiPath.Search}/${id}`)).catch(
      () => {
        // Ride not found
        return {} as Ride;
      },
    );
  }

  loadOrders(): Promise<Order[]> {
    const isManager = this.adminGuard.canActivate();
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
}
