import { Component } from '@angular/core';
import { OrderService } from '@home/services/orders/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  constructor(private orderService: OrderService) {}
}
