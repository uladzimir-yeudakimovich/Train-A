import { RailRoute } from '@admin/models/route.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { StationStore } from '@admin/store/stations/stations.store';
import { HttpErrorResponse } from '@angular/common/http';
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
import { ErrorReason } from '@shared/models/enums/api-path.enum';
import { Message } from '@shared/models/enums/messages.enum';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';

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

  cities = computed(() => {
    const stationIds = this.route().path;
    return this.stationStore
      .getStationsByIds()(stationIds)
      .map((station) => station?.city);
  });

  readonly dialog = inject(MatDialog);

  private routeStore = inject(RouteStore);

  private stationStore = inject(StationStore);

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
            this.errorSnackBar(error);
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

  private errorSnackBar(error: HttpErrorResponse) {
    if (error.error.reason === ErrorReason.InvalidAccessToken) {
      this.snackBarService.open(Message.InvalidAccessToken);
    } else {
      this.snackBarService.open(Message.UnexpectedError);
    }
  }
}
