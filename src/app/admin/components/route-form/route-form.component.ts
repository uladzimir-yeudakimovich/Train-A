import { Station } from '@admin/models/route.model';
import { RouteManagementService } from '@admin/services/route-management/route-management.service';
import { Component, input, OnInit, output, signal, Signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Carriage } from '@shared/models/interfaces/carriage.model';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectionList,
    MatSelectModule,
    MatButton,
    ReactiveFormsModule,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent implements OnInit {
  routeId = input<number>(); // for update form
  closeForm = output<boolean>();
  routeForm!: FormGroup;
  carriageTypes = signal<Partial<Carriage>[]>([]);
  private stationsCache: Record<number, WritableSignal<Partial<Station>[]>> = {};

  constructor(
    private formBuilder: FormBuilder,
    private routeService: RouteManagementService,
  ) {}

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      stations: this.formBuilder.array([this.createFormControl()], this.minArrayLength(3)),
      carriages: this.formBuilder.array([this.createFormControl()], this.minArrayLength(3)),
    });
    this.setCarriageTypes();
  }

  onSubmit() {
    this.enableFormArrays();
    console.log('Submitted', this.routeForm.value);
    this.onReset();
  }

  onReset() {
    this.enableFormArrays();
    this.routeForm.reset();
    this.stations.clear();
    this.carriages.clear();
    this.stations.push(this.createFormControl());
    this.carriages.push(this.createFormControl());
  }

  onClose() {
    this.closeForm.emit(true);
  }

  onSetStation(idx: number) {
    const stationsNum = this.stations.length - 1;
    const isLast = idx === stationsNum;
    if (!isLast) return;

    if (stationsNum) {
      this.stations.at(stationsNum - 1).disable();
    }
    this.stations.push(this.createFormControl());
  }

  onSetCarriage(idx: number) {
    const carriagesNum = this.carriages.length - 1;
    const isLast = idx === carriagesNum;
    if (!isLast) return;

    this.carriages.push(this.createFormControl());
  }

  onDeleteStation(event: Event, idx: number) {
    event.stopPropagation();
    this.stations.removeAt(idx);
    this.stations.at(idx - 1).enable();
  }

  onDeleteCarriage(event: Event, idx: number) {
    event.stopPropagation();
    this.carriages.removeAt(idx);
  }

  getConnectedStations(stationId?: number): Signal<Partial<Station>[]> {
    const id = stationId ? stationId : -1;
    const isInitialized = !!this.stationsCache[id];
    if (!isInitialized) {
      this.stationsCache[id] = signal<Partial<Station>[]>([]);

      this.routeService.getConnectedCities(stationId).then((stations) => {
        this.stationsCache[id].set(stations);
      });
    }
    return this.stationsCache[id];
  }

  
  get stations() {
    return this.routeForm.get('stations') as FormArray;
  }
  
  get carriages() {
    return this.routeForm.get('carriages') as FormArray;
  }
  
  private setCarriageTypes() {
    this.routeService.getCarriageTypes().then((carriages) => {
      console.log('Carriages:', carriages);
      this.carriageTypes.set(carriages);
    });
  }

  private createFormControl() {
    return this.formBuilder.control('');
  }

  private minArrayLength(min: number) {
    // the last value is always empty, so check min + 1
    const minRequiredLength = min + 1;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        return control.length >= minRequiredLength
          ? null
          : { minArrayLength: { requiredLength: minRequiredLength, actualLength: control.length } };
      }
      return null;
    };
  }

  private enableFormArrays() {
    this.stations.enable();
    this.carriages.enable();
  }
}
