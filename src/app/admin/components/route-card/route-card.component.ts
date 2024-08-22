import { DeleteDialogComponent } from '@admin/components/delete-dialog/delete-dialog.component';
import { RailRoute } from '@admin/models/route.model';
import { JoinWithDashPipe } from '@admin/pipes/join-with-dash.pipe';
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
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '@shared/models/enums/route-path.enum';

import { RouteFormComponent } from '../route-form/route-form.component';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    JoinWithDashPipe,
    RouteFormComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent implements OnInit {
  route = input.required<RailRoute>();

  cities = computed(() => {
    return this.routeService.getStationCities(this.route().path);
  });

  displayUpdateForm = signal<boolean>(false);

  private routeStore = inject(RouteStore);

  private stationStore = inject(StationStore);

  constructor(
    private routeService: RouteManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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

  ngOnInit(): void {
    this.stationStore.getStations();
  }

  private onDeleteClick(): void {
    this.routeStore.deleteRoute(this.route().id);
  }

  onAssignRideClick(): void {
    const routeId = this.route().id;
    this.router.navigate([RoutePath.AdminRoutes, routeId], {
      relativeTo: this.activatedRoute,
    });
  }

  toggleUpdateForm(): void {
    this.displayUpdateForm.set(!this.displayUpdateForm());
  }
}
