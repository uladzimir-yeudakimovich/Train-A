import { RailRoute } from '@admin/models/route.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { RouteCardComponent } from '../route-card/route-card.component';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouteCardComponent, MatProgressSpinner],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
})
export class RouteListComponent implements OnInit {
  routes!: Signal<RailRoute[]>;

  private routeStore = inject(RouteStore);

  ngOnInit() {
    this.routes = this.routeStore.routesEntities;
    this.routeStore.getRoutes();
  }
}
