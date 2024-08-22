import { ChangeDetectionStrategy, Component, effect, input, viewChild } from '@angular/core';

import { stationFormImports } from './station-form.config';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { StationStore } from '@admin/store/stations.store';
import { StationFormData, StationGeoLocation } from '@admin/models/station-form.model';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: stationFormImports,
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationFormComponent {
  latlng = input.required<StationGeoLocation>();

  stations = this.stationStore.stationsEntities;

  stationForm = this.formBuilder.nonNullable.group(
    {
      city: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      latitude: [0, [Validators.max(90), Validators.min(-90)]],
      longitude: [0, [Validators.max(180), Validators.min(-180)]],
      relations: this.formBuilder.array([this.formBuilder.control(0, Validators.required)]),
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
      this.latitude.setValue(lat as number);
      this.latitude.markAsTouched();
      this.longitude.setValue(lng as number);
      this.longitude.markAsTouched();
    });
  }

  get city() {
    return this.stationForm.get('city')!;
  }

  get cityError(): string {
    if (this.city.hasError('required')) {
      return 'Enter a city name';
    }

    if (this.city.hasError('maxlength')) {
      return 'Max length is 15';
    }

    if (this.city.hasError('minlength')) {
      return 'Min length is 3';
    }

    return '';
  }

  get latitude() {
    return this.stationForm.get('latitude')!;
  }

  get latError(): string {
    if (this.latitude.hasError('required')) {
      return 'Enter a latitude value';
    }

    if (this.latitude.hasError('max')) {
      return 'Max value is 90';
    }

    if (this.latitude.hasError('min')) {
      return 'Min value is -90';
    }

    return '';
  }

  get longitude() {
    return this.stationForm.get('longitude')!;
  }

  get lngError(): string {
    const longitude = this.stationForm.get('longitude');

    if (longitude!.hasError('required')) {
      return 'Enter a longitude value';
    }

    if (longitude!.hasError('max')) {
      return 'Max value is 180';
    }

    if (longitude!.hasError('min')) {
      return 'Min value is -180';
    }

    return '';
  }

  get relations(): FormArray<FormControl<number | null>> {
    return this.stationForm.controls?.['relations'];
  }

  addField(): void {
    const city = this.formBuilder.control(0, Validators.required);
    this.relations.push(city);
  }

  removeField(index: number): void {
    this.relations.removeAt(index);
  }

  createId(): string {
    return (Date.now() * Math.random()).toString(36);
  }

  async createStation() {
    await this.stationStore.addStation(this.stationForm.value as StationFormData);

    this.formViewChild().resetForm();
  }
}
