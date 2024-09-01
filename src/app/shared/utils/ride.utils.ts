import { Station } from '@admin/models/station.model';
import { getDiffInMinutes } from '@home/components/route-modal/route-modal.utils';
import { RouteStop } from '@home/models/trip.models';
import { EntityMap } from '@ngrx/signals/entities';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Order } from '@shared/models/interfaces/order.model';
import { Segment } from '@shared/models/interfaces/ride.model';

/*
 * Returns a map of carriage types and their total price for the given segments.
 * Each segment should have the same carriage types.
 *
 * @param {Segment[]} segments - The list of segments to calculate the price for.
 * @returns {Record<string, number>} - The map of carriage types and their total price.
 */
export function calculateTotalPriceByCarriageType(
  segments: Segment[],
): Record<string, number> {
  const priceMap: Record<string, number> = {};

  if (segments.length === 0) {
    return priceMap;
  }

  const carriageTypes = Object.keys(segments[0].price);
  carriageTypes.forEach((carType) => {
    const totalPrice = segments.reduce((acc, s) => {
      const priceInSegment = s.price[carType];
      return acc + priceInSegment;
    }, 0);

    priceMap[carType] = totalPrice;
  });

  return priceMap;
}

/*
 * Returns a map of carriage types and their carriages.
 *
 * @param {Carriage[]} carriages - The list of carriages to group by type.
 * @returns {Record<string, Carriage[]>} - The map of carriage types and their carriages.
 */
export function groupCarriagesByType(
  carriages: Carriage[],
): Record<string, Carriage[]> {
  const typesWithCars: Record<string, Carriage[]> = {};

  carriages.forEach((carriage) => {
    const type = carriage.name;
    const existing = typesWithCars[type];

    if (existing) {
      existing.push(carriage);
    } else {
      typesWithCars[type] = [carriage];
    }
  });

  return typesWithCars;
}

export function convertRecordToKeyValueList<
  K extends string | number | symbol,
  V,
>(record: Record<K, V>): { key: K; value: V }[] {
  return Object.entries(record).map(([key, value]) => ({
    key: key as K,
    value: value as V,
  }));
}

/*
 * Returns a list of segments between the given stations.
 *
 * @param {path, schedule} ride - The ride with path and schedule.
 * @param {number} fromId - The id of the station to start from.
 * @param {number} toId - The id of the station to end at.
 * @returns {Segment[]} - The list of segments between the given stations.
 */
export function getRideSegments(
  ride: { path: number[]; schedule: { segments: Segment[] } },
  fromId: number,
  toId: number,
): Segment[] {
  const schedule: Segment[] = [];
  const fromStationIdx = ride.path.indexOf(fromId);
  const toStationIdx = ride.path.indexOf(toId);

  if (fromStationIdx === -1 || toStationIdx === -1) {
    return [];
  }

  for (let i = fromStationIdx; i < toStationIdx; i += 1) {
    schedule.push(ride.schedule.segments[i]);
  }
  return schedule;
}

/*
 * Returns a map of carriage types and their available seats number.
 *
 * @param {Carriage[]} carriages - The list of carriages to calculate the available seats for.
 * @returns {Record<string, number>} - The map of carriage types and their available seats number.
 */
export function calculateAvailableSeatsByCarriageType(
  carriages: Carriage[],
): Record<string, number> {
  const groupedCarriages = groupCarriagesByType(carriages);
  const availableSeatsMap: Record<string, number> = {};

  Object.entries(groupedCarriages).forEach(([type, typeCars]) => {
    const availableSeatsInCarriage = typeCars.reduce((acc, carriage) => {
      return (
        acc +
        carriage.seats.filter((s) => s.state !== SeatState.Reserved).length
      );
    }, 0);
    availableSeatsMap[type] = availableSeatsInCarriage;
  });

  return availableSeatsMap;
}

/*
 * Returns a list of carriage seat numbers scopes.
 *
 * @param {Carriage[]} carriages - The list of carriage objects.
 * @param {string[]} trainCarriages - The list of carriage types in the train.
 * If not provided, carriages will be used as a source.
 * @returns {{ from: number; to: number }[]} - The list of carriage seat numbers scopes.
 */
export function getSeatScopes(
  carriages: Carriage[],
  trainCarriages?: string[],
): { from: number; to: number }[] {
  const seatScopes: { from: number; to: number }[] = [];
  let fromSeat = 1;

  const tripCarriages = trainCarriages || carriages.map((c) => c.name);

  tripCarriages.forEach((carType) => {
    const carriage = carriages.find((c) => c.name === carType);
    if (carriage) {
      const toSeat = fromSeat + carriage.seats.length - 1;
      seatScopes.push({ from: fromSeat, to: toSeat });
      fromSeat = toSeat + 1;
    }
  });

  return seatScopes;
}

/*
 * Returns a car index and seat number by the seat index.
 *
 * @param {Carriage[]} carriages - The list of carriage objects.
 * @param {number} seatIdx - The seat index (from API).
 * @param {string[]} trainCarriages - The list of carriage types in the train.
 * If not provided, carriages will be used as a source.
 * @returns {{ carIdx: number; seatNumber: number }} - The car index and seat number.
 */
export function convertSeatIndexToCarInfo(
  carriages: Carriage[],
  seatIdx: number,
  trainCarriages?: string[],
): { carIdx: number; seatNumber: number } {
  const tripCarriages = trainCarriages || carriages.map((c) => c.name);

  const seatScopes = getSeatScopes(carriages, tripCarriages);
  let carIdx = 0;
  while (seatIdx > seatScopes[carIdx].to) {
    carIdx += 1;
  }
  const { from } = seatScopes[carIdx];
  const seatNumber = seatIdx - from + 1;
  return { carIdx, seatNumber };
}

export function convertCarInfoToSeatIndex(
  carriages: Carriage[],
  carIdx: number,
  seatNumber: number,
  trainCarriages?: string[],
): number {
  const tripCarriages = trainCarriages || carriages.map((c) => c.name);
  const seatScopes = getSeatScopes(carriages, tripCarriages);
  const seatIdx = seatScopes[carIdx].from + seatNumber - 1;
  return seatIdx;
}

export function calculateTripDuration(segments: Segment[]) {
  const startTime = segments[0].time[0];
  const endTime = segments[segments.length - 1].time[1];
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end.getTime() - start.getTime();

  return diff;
}

export function calculateTripPrice(
  tripSegments: Segment[],
  carType: string,
): number {
  return tripSegments.reduce((acc, segment) => {
    return acc + segment.price[carType];
  }, 0);
}

/*
 * Returns the car type, car number and seat number by the seat index.
 *
 * @param {Order} order - The order object.
 * @param {Carriage[]} carriages - The list of carriage types.
 * @returns {{ carType: string; carNumber: number; seatNumber: number }}
 *  - The car type (Carriage.name), carNumber (index + 1), seatNumber (relative to the car).
 */
export function getCarInfo(
  order: Order,
  carriages: Carriage[],
): {
  carType: string;
  carNumber: number;
  seatNumber: number;
} {
  const seatNumber = order.seatId;
  const seatScopes = getSeatScopes(carriages, order.carriages);

  for (let i = 0; i < order.carriages.length; i += 1) {
    const { from, to } = seatScopes[i];
    if (seatNumber >= from && seatNumber <= to) {
      return {
        carType: order.carriages[i],
        carNumber: i + 1,
        seatNumber: seatNumber - from + 1,
      };
    }
  }
  return { carType: '', carNumber: 0, seatNumber: 0 };
}

/*
 * Transforms the order object to the order view object.
 *
 * @param {EntityMap<Station>} stationsMap - The map of stations (from the StationStore).
 * @param {Order} order - The order object to transform.
 * @param {Carriage[]} carriages - The list of carriage types (from the CarriageStore).
 * @returns {OrderView} - The order view object to display in the UI.
 */
export function transformOrderToView(
  stationsMap: EntityMap<Station>,
  order: Order,
  carriages: Carriage[],
) {
  const tripSegments = getRideSegments(
    order,
    order.stationStart,
    order.stationEnd,
  );
  const startStation = stationsMap[order.stationStart].city;
  const startTime = tripSegments[0].time[0];
  const endStation = stationsMap[order.stationEnd].city;
  const endTime = tripSegments[tripSegments.length - 1].time[1];
  const tripDuration = calculateTripDuration(tripSegments);
  const { carType, carNumber, seatNumber } = getCarInfo(order, carriages);
  const price = calculateTripPrice(tripSegments, carType);

  return {
    id: order.id,
    status: order.status,
    startStation,
    startTime,
    endStation,
    endTime,
    tripDuration,
    carType,
    carNumber,
    seatNumber,
    price,
  };
}

/*
 * Returns a list of route stops with arrival, departure and dwell time.
 *
 * @param {Station[]} stations - The list of stations of the trip.
 * @param {Segment[]} segments - The list of segments of the trip.
 * @returns {RouteStop[]} - The list of route stops with arrival, departure and dwell time.
 */
export function getRouteStops(
  stations: Station[],
  segments: Segment[],
): RouteStop[] {
  const routeStops: RouteStop[] = [];
  stations.forEach((station, idx) => {
    const arrival = idx > 0 ? segments[idx - 1].time[1] : '';
    const departure = idx < segments.length ? segments[idx].time[0] : '';
    const dwellTime = getDiffInMinutes(arrival, departure);

    routeStops.push({
      station,
      arrival,
      departure,
      dwellTime,
    });
  });

  return routeStops;
}
