import {
  StationFormData,
  StationGeoLocation,
} from '@admin/models/station-form.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { mapFormToStation } from '@admin/utils/mapFormToStation';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroupDirective,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { stationFormImports } from './station-form.config';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: stationFormImports,
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationFormComponent {
  private stationStore = inject(StationStore);

  latlng = input.required<StationGeoLocation>();

  stations = this.stationStore.stationsEntities;

  stationForm = this.formBuilder.nonNullable.group(
    {
      city: ['', [Validators.required, Validators.maxLength(100)]],

      latitude: [0, [Validators.max(90), Validators.min(-90)]],

      longitude: [0, [Validators.max(180), Validators.min(-180)]],

      relations: this.formBuilder.array(
        [this.formBuilder.control<number | null>(null)],
        this.uniqueRelationsValidator,
      ),
    },
    { updateOn: 'blur' },
  );

  private formViewChild = viewChild.required(FormGroupDirective);

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      const [lat, lng] = this.latlng();

      this.latitude.setValue(lat);
      this.latitude.markAsTouched();

      this.longitude.setValue(lng);
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
      return 'City name is too long';
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

  get relations(): FormArray {
    return this.stationForm.get('relations') as FormArray;
  }

  onSetConnected(fieldIdx: number) {
    const lastFieldIdx = this.relations.length - 1;
    if (fieldIdx === lastFieldIdx) {
      this.addField();
    }
  }

  private addField(): void {
    const city = this.formBuilder.control(null);
    this.relations.push(city);
  }

  removeField(index: number): void {
    this.relations.removeAt(index);
  }

  createId(): string {
    return (Date.now() * Math.random()).toString(36);
  }

  async createStation() {
    const newStation = mapFormToStation({
      ...this.stationForm.value,
      relations: this.relations.value.filter((item: number | null) => !!item),
    } as StationFormData);

    await this.stationStore.addStation(newStation);

    this.formViewChild().resetForm();

    this.relations.clear();

    this.addField();
  }

  private uniqueRelationsValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const formArray = control as FormArray;

    const values = formArray.controls.map((c) => c.value);

    const hasDuplicates = values.some(
      (value, index) => !!value && values.indexOf(value) !== index,
    );

    return hasDuplicates ? { nonUnique: true } : null;
  }
}
