import { RailRoute } from '@admin/models/route.model';
import { Component, input } from '@angular/core';

import { RouteCardComponent } from '../route-card/route-card.component';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouteCardComponent],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
})
export class RouteListComponent {
  routes = input.required<RailRoute[]>();
}
