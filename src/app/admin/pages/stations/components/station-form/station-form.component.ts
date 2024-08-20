import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { stationFormImports } from './station-form.config';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StationStore } from '@admin/store/stations.store';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: stationFormImports,
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationFormComponent {
  private adminStore = inject(StationStore);
  private formBuilder = inject(FormBuilder);

  stations = computed(() => this.adminStore.stationsEntities());

  stationForm = this.formBuilder.nonNullable.group(
    {
      city: ['', Validators.required],
      latitude: [null, [Validators.max(90), Validators.min(-90)]],
      longitude: [null, [Validators.max(180), Validators.min(-180)]],
      relations: this.formBuilder.array([this.formBuilder.control('', Validators.required)]),
    },
    { updateOn: 'blur' },
  );

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

  createStation() {
    const city = this.city.value ?? '';
    const latitude = Number(this.latitude.value ?? 0);
    const longitude = Number(this.longitude.value ?? 0);
    const relations = (this.relations.value ?? []).map((id) => Number(id));

    const body = { city, latitude, longitude, relations };

    this.adminStore.addStation(body);
  }
}
