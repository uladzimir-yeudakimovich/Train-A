import { RailRoute } from '@admin/models/route.model';
import { Station } from '@admin/models/station.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { StationStore } from '@admin/store/stations/stations.store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  inject,
  input,
  OnInit,
  output,
  Signal,
  signal,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorReason } from '@shared/models/enums/api-path.enum';
import { Message } from '@shared/models/enums/messages.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

import {
  maxCarriagesNumber,
  maxStationsNumber,
  minCarriagesNumber,
  minStationsNumber,
  routeFormImports,
} from './route-form.config';
import { minArrayLength } from './route-form.utils';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: routeFormImports,
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent implements OnInit {
  route = input<RailRoute>();

  closeForm = output<boolean>();

  routeForm!: FormGroup;

  carriageOptions!: Signal<Partial<Carriage>[]>;

  connectedStationsMap!: Signal<(stationId: number) => Station[]>;

  isLoading = signal<boolean>(false);

  private carriageStore = inject(CarriageStore);

  private stationStore = inject(StationStore);

  private routeStore = inject(RouteStore);

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.connectedStationsMap = this.stationStore.getConnectedStations;
    this.carriageOptions = this.carriageStore.carriagesEntities;

    this.routeForm = this.formBuilder.group({
      stations: this.formBuilder.array(
        [],
        [
          minArrayLength(minStationsNumber),
          Validators.maxLength(maxStationsNumber),
        ],
      ),
      carriages: this.formBuilder.array(
        [],
        [
          minArrayLength(minCarriagesNumber),
          Validators.maxLength(maxCarriagesNumber),
        ],
      ),
    });
    this.initRouteForm();
  }

  onSubmit() {
    // enable disabled fields to get values
    this.stations.enable();

    const isUpdateMode = !!this.route();
    const newRoute = this.getFormRoute();

    this.isLoading.set(true);
    if (isUpdateMode) {
      this.routeStore
        .updateRoute(this.route()!.id, newRoute)
        .then(() => {
          this.onClose();
        })
        .catch((error) => {
          this.errorSnackBar(error);
        })
        .finally(() => {
          this.isLoading.set(false);
        });
      return;
    }

    this.routeStore
      .postRoute(newRoute)
      .then(() => {
        this.onReset();
      })
      .catch((error) => {
        this.errorSnackBar(error);
      })
      .finally(() => {
        this.isLoading.set(false);
      });
  }

  onReset() {
    this.routeForm.reset();
    this.stations.clear();
    this.carriages.clear();

    this.initRouteForm();
    this.enableLastTwoStations();
  }

  onClose() {
    this.closeForm.emit(true);
  }

  onSetStation(idx: number) {
    const stationsNum = this.stations.length - 1;
    const isLast = idx === stationsNum;
    if (!isLast) return;

    this.addStationControl();
    this.enableLastTwoStations();
  }

  onSetCarriage(idx: number) {
    const carriagesNum = this.carriages.length - 1;
    const isLast = idx === carriagesNum;
    if (!isLast) return;

    this.addCarriageControl();
  }

  onDeleteStation(event: Event, idx: number) {
    event.stopPropagation();
    this.stations.removeAt(idx);
    this.enableLastTwoStations();
    this.routeForm.markAsDirty();
  }

  onDeleteCarriage(event: Event, idx: number) {
    event.stopPropagation();
    this.carriages.removeAt(idx);
    this.routeForm.markAsDirty();
  }

  onStationClick(idx: number) {
    const stationControl = this.stations.at(idx);
    if (stationControl.disabled) {
      this.snackBarService.open(Message.RoutFormCannotChangeStation);
    }
  }

  getStationsErrorMessage() {
    return this.stations.hasError('minArrayLength')
      ? 'At least 3 stations are required'
      : '';
  }

  getCarriagesErrorMessage() {
    return this.carriages.hasError('minArrayLength')
      ? 'At least 3 carriages are required'
      : '';
  }

  isSaveDisabled(): boolean {
    return !this.routeForm.valid || this.routeForm.pristine;
  }

  get stations() {
    return this.routeForm.get('stations') as FormArray;
  }

  get carriages() {
    return this.routeForm.get('carriages') as FormArray;
  }

  private getFormRoute(): Partial<RailRoute> {
    return {
      path: this.stations.value.slice(0, -1).map(Number), // slice to remove the last empty field
      carriages: this.carriages.value.slice(0, -1),
    };
  }

  private initRouteForm() {
    const route = this.route();
    if (route) {
      route.path.forEach((stationId) => {
        this.stations.push(this.formBuilder.control(stationId));
      });
      route.carriages.forEach((carriage) => {
        this.carriages.push(this.formBuilder.control(carriage));
      });
    }
    // empty fields at the end
    this.addCarriageControl();
    this.addStationControl();

    this.enableLastTwoStations();
  }

  private enableLastTwoStations() {
    const stations = this.stations.controls;
    if (stations.length < 2) {
      this.stations.enable();
      return;
    }
    this.stations.disable({ emitEvent: false, onlySelf: true });
    stations[stations.length - 1].enable();
    stations[stations.length - 2].enable();
  }

  private addCarriageControl() {
    this.carriages.push(this.formBuilder.control(null));
  }

  private addStationControl() {
    this.stations.push(this.formBuilder.control(null));
  }

  private errorSnackBar(error: HttpErrorResponse) {
    if (error.error.reason === ErrorReason.InvalidAccessToken) {
      this.snackBarService.open(Message.InvalidAccessToken);
    } else {
      this.snackBarService.open(Message.UnexpectedError);
    }
  }
}
