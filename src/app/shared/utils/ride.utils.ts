import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Ride, Segment } from '@shared/models/interfaces/ride.model';

/*
 * Returns a map of carriage types and their total price for the given segments.
 * Each segment should have the same carriage types.
 *
 * @param {Segment[]} segments - The list of segments to calculate the price for.
 * @returns {Record<string, number>} - The map of carriage types and their total price.
 */
export function getPriceMap(segments: Segment[]): Record<string, number> {
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
export function getCarriageTypeMap(
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

export function recordToKeyValueList<K extends string | number | symbol, V>(
  record: Record<K, V>,
): { key: K; value: V }[] {
  return Object.entries(record).map(([key, value]) => ({
    key: key as K,
    value: value as V,
  }));
}

/*
 * Returns a list of segments between the given stations.
 *
 * @param {Ride} ride - The ride to extract segments from.
 * @param {number} fromId - The id of the station to start from.
 * @param {number} toId - The id of the station to end at.
 * @returns {Segment[]} - The list of segments between the given stations.
 */
export function extractRideSegments(
  ride: Ride,
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
export function getAvailableSeatsNumberMap(
  carriages: Carriage[],
): Record<string, number> {
  const groupedCarriages = getCarriageTypeMap(carriages);
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
 * Returns a map of carriage codes and their seat scopes (indexes of seats).
 *
 * @param {Carriage[]} carriages - The list of carriages to calculate the seat scopes for.
 * @returns {Record<string, { from: number; to: number }>} - carriage codes and their seat scopes.
 */
export function getSeatScopes(
  carriages: Carriage[],
): Record<string, { from: number; to: number }> {
  const seatScopes: Record<string, { from: number; to: number }> = {};

  let fromSeat = 1;
  carriages.forEach((carriage) => {
    const toSeat = fromSeat + carriage.seats.length - 1;
    seatScopes[carriage.code] = { from: fromSeat, to: toSeat };
    fromSeat = toSeat + 1;
  });

  return seatScopes;
}

export function convertSeatIndexToCarIndexWithSitNumber(
  carriages: Carriage[],
  seatIdx: number,
): { carIdx: number; seatNumber: number } {
  const seatScopes = getSeatScopes(carriages);
  const carCode = Object.keys(seatScopes).find((code) => {
    const { from, to } = seatScopes[code];
    return seatIdx >= from && seatIdx <= to;
  })!;
  const { from } = seatScopes[carCode];
  const seatNumber = seatIdx - from + 1;
  const carIdx = carriages.findIndex((c) => c.code === carCode);
  return { carIdx, seatNumber };
}

export function convertCarIndexWithSeatNumberToSeatIndex(
  carriages: Carriage[],
  carIdx: number,
  seatNumber: number,
): number {
  const carCode = carriages[carIdx].code;
  const seatScopes = getSeatScopes(carriages);
  const seatIdx = seatScopes[carCode].from + seatNumber - 1;
  return seatIdx;
}
