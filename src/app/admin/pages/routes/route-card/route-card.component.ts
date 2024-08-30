import { RailRoute } from '@admin/models/route.model';
import { RouteManagementService } from '@admin/services/route-management/route-management.service';
import { RouteStore } from '@admin/store/routes/routes.store';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@shared/components/delete-dialog/confirmation-dialog.component';

import { routeCardImports } from './route-card.config';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: routeCardImports,
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent implements OnInit {
  route = input.required<RailRoute>();

  displayUpdateForm = signal<boolean>(false);

  cities = computed(() => {
    return this.routeService.getStationCities(this.route().path);
  });

  readonly dialog = inject(MatDialog);

  private routeStore = inject(RouteStore);

  private stationStore = inject(StationStore);

  constructor(
    private routeService: RouteManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.stationStore.getStations();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Delete Route ${this.route().id}`,
        message: 'Are you sure you want to delete this route?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDeleteClick();
      }
    });
  }

  onAssignRideClick() {
    const routeId = this.route().id;
    this.router.navigate([routeId], {
      relativeTo: this.activatedRoute,
    });
  }

  toggleUpdateForm() {
    this.displayUpdateForm.update((value) => !value);
  }

  private onDeleteClick() {
    this.routeStore.deleteRoute(this.route().id);
  }
}
