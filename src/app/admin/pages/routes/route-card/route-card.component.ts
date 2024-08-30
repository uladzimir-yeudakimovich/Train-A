import { RailRoute } from '@admin/models/route.model';
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
        this.routeStore.deleteRoute(this.route().id);
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
}
