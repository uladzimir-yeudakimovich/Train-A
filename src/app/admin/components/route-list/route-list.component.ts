import { RailRoute } from '@admin/models/route.model';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouteCardComponent } from '../route-card/route-card.component';
import { RouteStore } from '@admin/store/routes/routes.store';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouteCardComponent],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss'
})
export class RouteListComponent implements OnInit {
  routes!: Signal<RailRoute[]>;
  private routeStore = inject(RouteStore);

  ngOnInit() {
    this.routes = this.routeStore.routesEntities;
    this.routeStore.getRoutes();
  }
}
