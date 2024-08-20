import { RailRoute } from '@admin/models/route.model';
import { Component, inject, OnInit, signal } from '@angular/core';
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
  routes = signal<RailRoute[]>([]);
  private routesStore = inject(RouteStore);

  ngOnInit() {
    this.routesStore.getRoutes().then(routes => this.routes.set(routes()));
  }
}
