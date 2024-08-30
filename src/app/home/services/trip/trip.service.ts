import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { BookItem } from '@home/models/trip.models';
import { TripStore } from '@home/store/trip/trip.store';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Segment } from '@shared/models/interfaces/ride.model';
import { extractRideSegments, getPriceMap } from '@shared/utils/ride.utils';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  rideSegments: Segment[] = [];

  private fromStation: Station = {} as Station;

  private toStation: Station = {} as Station;

  private tripStore = inject(TripStore);

  private stationStore = inject(StationStore);

  async initStore(rideId: number, fromId: number, toId: number) {
    await this.tripStore.initStore(rideId);
    this.initRideSegments(fromId, toId);
    this.tripStore.initOccupiedSeats(this.getOccupiedSeats());
    this.initEdgeStations(fromId, toId);
  }

  getEdgeStationsInfo() {
    const ride = this.tripStore.ride();
    return {
      rideId: ride.rideId,
      from: this.fromStation,
      to: this.toStation,
      departure: this.rideSegments[0].time[0],
      arrival: this.rideSegments.slice(-1)[0].time[1],
    };
  }

  getPriceMap(): Record<string, number> {
    const segments = this.rideSegments;
    return getPriceMap(segments);
  }

  getBookItems(): Signal<BookItem[]> {
    return computed(() => {
      const carriages = this.tripStore.carriages();
      const bookItems: BookItem[] = [];

      carriages.forEach((carriage) => {
        const selectedSeats = carriage.seats.filter(
          (s) => s.state === SeatState.Selected,
        );
        selectedSeats.forEach((seat) => {
          bookItems.push({
            carId: carriage.code,
            seatNumber: seat.number,
            price: this.getPriceMap()[carriage.name],
          });
        });
      });

      return bookItems;
    });
  }

  private getOccupiedSeats(): number[] {
    const occupiedSeats = new Set<number>();

    this.rideSegments.forEach((segment) => {
      segment.occupiedSeats?.forEach((seat) => {
        occupiedSeats.add(seat);
      });
    });
    return Array.from(occupiedSeats.values());
  }

  private initRideSegments(fromId: number, toId: number) {
    const ride = this.tripStore.ride();
    this.rideSegments = extractRideSegments(ride, fromId, toId);
  }

  private initEdgeStations(fromId: number, toId: number) {
    const stations = this.stationStore.stationsEntityMap();
    this.fromStation = stations[fromId];
    this.toStation = stations[toId];
  }
}
