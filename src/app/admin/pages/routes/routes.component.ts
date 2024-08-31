import { RailRoute } from '@admin/models/route.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesComponent implements OnInit {
  displayCreateRouteForm = signal<boolean>(false);

  routes!: Signal<RailRoute[]>;

  isLoading = signal<boolean>(true);

  private routeStore = inject(RouteStore);

  private stationStore = inject(StationStore);

  private carriageStore = inject(CarriageStore);

  ngOnInit() {
    Promise.all([
      this.carriageStore.getCarriages(),
      this.stationStore.getStations(),
      this.routeStore.getRoutes(),
    ]).then(() => {
      this.isLoading.set(false);
    });
    this.routes = this.routeStore.routesEntities;
  }

  toggleRouteForm() {
    this.displayCreateRouteForm.update((value) => !value);
  }
}
