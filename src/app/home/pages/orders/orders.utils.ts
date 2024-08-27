import { Sort } from '@angular/material/sort';
import { Order } from '@shared/models/interfaces/order.model';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function sortOrders(sort: Sort, data: Order[]) {
  const orders = data.slice();
  if (!sort.active || sort.direction === '') {
    return orders;
  }

  return orders.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        return compare(a.id, b.id, isAsc);
      case 'userId':
        return compare(a.userId, b.userId, isAsc);
      case 'status':
        return compare(a.status, b.status, isAsc);
      default:
        return 0;
    }
  });
}
