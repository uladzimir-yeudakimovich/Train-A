import { Sort } from '@angular/material/sort';
import { OrderView } from '@shared/models/interfaces/order.model';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function sortOrders(sort: Sort, data: OrderView[]) {
  const orders = data.slice();
  if (!sort.active || sort.direction === '') {
    return orders;
  }

  return orders.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'startStation':
        return compare(a.startStation, b.startStation, isAsc);
      case 'startTime':
        return compare(a.startTime, b.startTime, isAsc);
      case 'endStation':
        return compare(a.endStation, b.endStation, isAsc);
      case 'endTime':
        return compare(a.endTime, b.endTime, isAsc);
      case 'tripDuration':
        return compare(a.tripDuration, b.tripDuration, isAsc);
      case 'carType':
        return compare(a.carType, b.carType, isAsc);
      case 'carNumber':
        return compare(a.carNumber, b.carNumber, isAsc);
      case 'seatNumber':
        return compare(a.seatNumber, b.seatNumber, isAsc);
      case 'price':
        return compare(a.price, b.price, isAsc);
      default:
        return 0;
    }
  });
}
