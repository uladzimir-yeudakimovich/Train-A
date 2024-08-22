import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  viewChild,
} from '@angular/core';

import { stationFormImports } from './station-form.config';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { StationStore } from '@admin/store/stations.store';
import { StationLocationTuple } from '@admin/models/station-form.model';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: stationFormImports,
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationFormComponent {
  latlng = input.required<StationLocationTuple>();

  stations = computed(() => this.stationStore.stationsEntities());

  stationForm = this.formBuilder.nonNullable.group(
    {
      city: ['', Validators.required],
      latitude: [null, [Validators.max(90), Validators.min(-90)]],
      longitude: [null, [Validators.max(180), Validators.min(-180)]],
      relations: this.formBuilder.array([this.formBuilder.control('', Validators.required)]),
    },
    { updateOn: 'blur' },
  );

  private formViewChild = viewChild.required(FormGroupDirective);

  constructor(
    private stationStore: StationStore,
    private formBuilder: FormBuilder,
  ) {
    effect(() => {
      const [lat, lng] = this.latlng();
      this.latitude.setValue(lat);
      this.longitude.markAsTouched();
      this.longitude.setValue(lng);
      this.longitude.markAsTouched();
    });
  }

  get city(): FormControl<string> {
    return this.stationForm.controls?.['city'];
  }

  get latitude(): FormControl<number | null> {
    return this.stationForm.controls?.['latitude'];
  }

  get longitude(): FormControl<number | null> {
    return this.stationForm.controls?.['longitude'];
  }

  get relations(): FormArray<FormControl<string | null>> {
    return this.stationForm.controls?.['relations'];
  }

  addField(): void {
    const city = this.formBuilder.control('', Validators.required);
    this.relations.push(city);
  }

  removeField(index: number): void {
    this.relations.removeAt(index);
  }

  createId(): string {
    return (Date.now() * Math.random()).toString(36);
  }

  async createStation() {
    const city = this.city.value ?? '';
    const latitude = Number(this.latitude.value ?? 0);
    const longitude = Number(this.longitude.value ?? 0);
    const relations = (this.relations.value ?? []).map(Number);

    const body = { city, latitude, longitude, relations };

    await this.stationStore.addStation(body);

    this.formViewChild().resetForm();
  }
}
