import { RidesStore } from '@admin/store/rides/ride.store';
import { StationStore } from '@admin/store/stations/stations.store';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '@shared/models/enums/route-path.enum';

import { RideCardFormComponent } from './components/ride-card-form/ride-card-form.component';
import { RideListComponent } from './components/ride-list/ride-list.component';

@Component({
  selector: 'app-rides',
  standalone: true,
  imports: [
    MatButton,
    MatMiniFabButton,
    MatIcon,
    RideListComponent,
    RideCardFormComponent,
  ],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
})
export class RidesComponent implements OnInit {
  routeId: number | null = null;

  private stationsStore = inject(StationStore);

  ridesStore = inject(RidesStore);

  formVisible = signal(false);

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id || Number.isNaN(Number(id))) {
      this.router.navigate([RoutePath.Admin, RoutePath.AdminRoutes]);
      return;
    }

    this.routeId = Number(id);

    await this.stationsStore.getStations();

    this.ridesStore.prepareStore(this.routeId);
  }

  onBackButtonClick(): void {
    this.router.navigate([RoutePath.Admin, RoutePath.AdminRoutes]);
  }

  showForm(): void {
    this.formVisible.set(true);
  }
}
