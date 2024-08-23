import { RailRoute } from '@admin/models/route.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { RouteFormComponent } from './route-form/route-form.component';
import { RouteListComponent } from './route-list/route-list.component';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    RouteListComponent,
    MatButton,
    RouteFormComponent,
    MatProgressSpinner,
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit {
  displayCreateRouteForm = signal<boolean>(false);

  routes!: Signal<RailRoute[]>;

  private routeStore = inject(RouteStore);

  ngOnInit() {
    this.routeStore.getRoutes();
    this.routes = this.routeStore.routesEntities;
  }

  toggleRouteForm() {
    this.displayCreateRouteForm.update((value) => !value);
  }
}
