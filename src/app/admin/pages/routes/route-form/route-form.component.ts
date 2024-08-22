import { RailRoute } from '@admin/models/route.model';
import { RouteStore } from '@admin/store/routes/routes.store';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  Signal,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages.store';

import { routeFormImports } from './route-form.config';
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

  connectedStationsMap = computed(() => {
    const stationsMap = this.stationStore.stationsEntityMap();

    return (stationId: number) => {
      if (!stationId) {
        return this.stationStore.stationsEntities();
      }
      const fromStation = stationsMap[stationId];
      const connectedStations = fromStation.connectedTo.map(
        (connection) => stationsMap[connection.id],
      );
      return connectedStations;
    };
  });

  private carriageStore = inject(CarriageStore);

  private stationStore = inject(StationStore);

  private routeStore = inject(RouteStore);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const minStationsNumber = 3;
    const minCarriagesNumber = 3;

    this.carriageStore.getCarriages();
    this.carriageOptions = this.carriageStore.carriagesEntities;

    this.routeForm = this.formBuilder.group({
      stations: this.formBuilder.array([], minArrayLength(minStationsNumber)),
      carriages: this.formBuilder.array([], minArrayLength(minCarriagesNumber)),
    });
    this.initRouteForm();
  }

  onSubmit() {
    // enable disabled fields to get values
    this.stations.enable();

    const isUpdateMode = !!this.route();
    const newRoute = this.getFormRoute();

    if (isUpdateMode) {
      this.routeStore.updateRoute(this.route()!.id, newRoute);
      this.onClose();
      return;
    }

    this.routeStore.postRoute(newRoute);
    this.onReset();
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
  }

  onDeleteCarriage(event: Event, idx: number) {
    event.stopPropagation();
    this.carriages.removeAt(idx);
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
    if (this.route()) {
      this.addStationControl(this.route()!.path);
      this.addCarriageControl(this.route()!.carriages);
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
    this.stations.disable();
    stations[stations.length - 1].enable();
    stations[stations.length - 2].enable();
  }

  private addCarriageControl(initValues?: string[]) {
    this.addControl(this.carriages, initValues);
  }

  private addStationControl(initValues?: number[]) {
    this.addControl(this.stations, initValues);
  }

  private addControl<T>(controls: FormArray, initValues?: T[]) {
    if (!initValues) {
      controls.push(this.formBuilder.control(''));
      return;
    }
    initValues.forEach((value: T) => {
      controls.push(this.formBuilder.control(value));
    });
  }
}
