import { RailRoute } from '@admin/models/route.model';
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
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectionList } from '@angular/material/list';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages.store';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelectionList,
    MatButton,
    MatIcon,
    MatFabButton,
    ReactiveFormsModule,
  ],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent implements OnInit {
  route = input<RailRoute>();

  closeForm = output<boolean>();

  routeForm!: FormGroup;

  carriageTypes!: Signal<Partial<Carriage>[]>;

  connectedStationsMap = computed(() => {
    const stations = this.stationStore.stationsEntities();
    const stationsMap = this.stationStore.stationsEntityMap();

    return (stationId: number) => {
      if (!stationId) {
        return stations;
      }
      const fromStation = stations[stationId];
      const connectedStations = fromStation.connectedTo.map(
        (connection) => stationsMap[connection.id],
      );
      return connectedStations;
    };
  });

  private carriageStore = inject(CarriageStore);

  private stationStore = inject(StationStore);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.carriageStore.getCarriages();
    this.carriageTypes = this.carriageStore.carriagesEntities;

    this.routeForm = this.formBuilder.group({
      stations: this.formBuilder.array([], this.minArrayLength(3)),
      carriages: this.formBuilder.array([], this.minArrayLength(3)),
    });
    this.route()?.path.forEach((stationId) =>
      this.pushStationControl(stationId),
    );
    this.route()?.carriages.forEach((carriage) =>
      this.pushCarriageControl(carriage),
    );

    // Add empty fields at the end
    this.pushCarriageControl();
    this.pushStationControl();

    this.enableLastTwoStations();
  }

  onSubmit() {
    this.stations.enable();
    // TODO: implement submit logic
    console.log('Submitted', this.routeForm.value);
    this.onReset();
  }

  onReset() {
    this.routeForm.reset();
    this.stations.clear();
    this.carriages.clear();
    this.pushStationControl();
    this.pushCarriageControl();
    this.enableLastTwoStations();
  }

  onClose() {
    this.closeForm.emit(true);
  }

  onSetStation(idx: number) {
    const stationsNum = this.stations.length - 1;
    const isLast = idx === stationsNum;
    if (!isLast) return;
    this.pushStationControl();
    this.enableLastTwoStations();
  }

  onSetCarriage(idx: number) {
    const carriagesNum = this.carriages.length - 1;
    const isLast = idx === carriagesNum;
    if (!isLast) return;

    this.pushCarriageControl();
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

  private pushCarriageControl(value?: string) {
    const initValue = value || '';
    this.carriages.push(this.formBuilder.control(initValue));
  }

  private pushStationControl(value?: string | number) {
    const initValue = value || '';
    this.stations.push(this.formBuilder.control(initValue));
  }

  private minArrayLength(min: number) {
    // the last value is always empty, so check min + 1
    const minRequiredLength = min + 1;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        if (control.length < minRequiredLength) {
          return null;
        }
        return {
          minArrayLength: {
            requiredLength: minRequiredLength,
            actualLength: control.length,
          },
        };
      }
      return null;
    };
  }
}
