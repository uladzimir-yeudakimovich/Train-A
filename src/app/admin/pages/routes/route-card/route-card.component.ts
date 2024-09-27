import { RailRoute } from '@admin/models/route.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@shared/components/delete-dialog/confirmation-dialog.component';
import { Message } from '@shared/models/enums/messages.enum';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

import { routeCardImports } from './route-card.config';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: routeCardImports,
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteCardComponent {
  route = input.required<RailRoute>();

  displayUpdateForm = signal<boolean>(false);

  isLoading = signal<boolean>(false);

  carriageTypes = computed(() => {
    const { carriages } = this.route();
    const carriageMap = this.carriageStore.carriagesEntityMap();
    return carriages.map((carriageCode) => carriageMap[carriageCode].name);
  });

  cities = computed(() => {
    const stationIds = this.route().path;
    return this.stationStore
      .getStationsByIds()(stationIds)
      .map((station) => station?.city);
  });

  readonly dialog = inject(MatDialog);

  private routeStore = inject(RouteStore);

  private stationStore = inject(StationStore);

  private carriageStore = inject(CarriageStore);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Delete Route ${this.route().id}`,
        message: Message.RouteDeleteConfirmation,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading.set(true);
        this.routeStore
          .deleteRoute(this.route().id)
          .catch((error) => {
            this.snackBarService.displayError(error);
          })
          .finally(() => {
            this.isLoading.set(false);
          });
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

  navigateToStation(stationId: string): void {
    this.router.navigate([RoutePath.Admin, RoutePath.AdminStations], {
      fragment: stationId,
    });
  }

  navigateToCarriage(carType: string): void {
    this.router.navigate([RoutePath.Admin, RoutePath.AdminCarriages], {
      fragment: carType,
    });
  }

  get toolbarButtons() {
    return [
      {
        label: 'Update',
        icon: 'edit_square',
        click: () => this.toggleUpdateForm(),
      },
      {
        label: 'Assign ride',
        icon: 'train',
        click: () => this.onAssignRideClick(),
      },
      {
        label: '',
        icon: 'delete',
        click: () => this.openDialog(),
      },
    ];
  }
}
