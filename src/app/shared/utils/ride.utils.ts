import { Carriage } from '@shared/models/interfaces/carriage.model';
import { Segment } from '@shared/models/interfaces/ride.model';

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
