import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { BookItem, TrainClass, TripView } from '@home/models/trip.models';
import { TripStore } from '@home/store/trip/trip.store';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Segment } from '@shared/models/interfaces/ride.model';
import { OrderStore } from '@shared/store/orders/orders.store';
import {
  calculateTotalPriceByCarriageType,
  convertCarInfoToSeatIndex,
  getRideSegments,
} from '@shared/utils/ride.utils';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private rideSegments: Segment[] = [];

  private fromStation: Station = {} as Station;

  private toStation: Station = {} as Station;

  private tripStore = inject(TripStore);

  private stationStore = inject(StationStore);

  private orderStore = inject(OrderStore);

  async initStore(rideId: number, fromId: number, toId: number) {
    await this.tripStore.initStore(rideId);
    await this.orderStore.getOrders();
    this.initRideSegments(fromId, toId);
    this.tripStore.initOccupiedSeats(this.getOccupiedSeats());
    this.initEdgeStations(fromId, toId);
  }

  getTripView(): Signal<TripView> {
    return computed(() => {
      const ride = this.tripStore.ride();
      const trainClasses = this.getTrainClasses();
      const lastSegment = this.rideSegments.slice(-1)[0];

      return {
        rideId: ride.rideId,
        from: this.fromStation,
        to: this.toStation,
        departure: this.rideSegments[0].time[0],
        arrival: lastSegment.time[1],
        trainClasses,
      };
    });
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
            price: this.priceMap[carriage.name],
          });
        });
      });

      return bookItems;
    });
  }

  createOrder(bookItems: BookItem[]) {
    const tripView = this.getTripView()();
    const { rideId } = tripView;
    const stationStart = tripView.from.id;
    const stationEnd = tripView.to.id;
    const carriages = this.tripStore.carriages();

    bookItems.forEach((bookItem) => {
      const { seatNumber, carId } = bookItem;
      const carIndex = carriages.findIndex((c) => c.code === carId);
      const seatIdx = convertCarInfoToSeatIndex(
        carriages,
        carIndex,
        seatNumber,
      );
      this.orderStore.createOrder(rideId, seatIdx, stationStart, stationEnd);
    });
    this.tripStore.selectedToReserved();
  }

  get segments(): Segment[] {
    return this.rideSegments;
  }

  private getTrainClasses(): TrainClass[] {
    const carriagesByTypeMap = this.tripStore.carriagesByTypeMap();
    const availableSeatsMap = this.tripStore.availableSeatsMap();

    return Object.entries(carriagesByTypeMap).map(([name, carriages]) => {
      const price = this.priceMap[name];
      const availableSeats = availableSeatsMap[name];

      return {
        name,
        carriages,
        price,
        availableSeats,
      };
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
    this.rideSegments = getRideSegments(ride, fromId, toId);
  }

  private initEdgeStations(fromId: number, toId: number) {
    const stations = this.stationStore.stationsEntityMap();
    this.fromStation = stations[fromId];
    this.toStation = stations[toId];
  }

  private get priceMap(): Record<string, number> {
    return calculateTotalPriceByCarriageType(this.rideSegments);
  }
}
