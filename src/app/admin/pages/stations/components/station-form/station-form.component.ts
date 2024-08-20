import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { stationFormImports } from './station-form.config';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
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
      city: [''],
      latitude: [null],
      longitude: [null],
      connected: this.formBuilder.array([this.formBuilder.control('')]),
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

  get connected(): FormArray<FormControl<string | null>> {
    return this.stationForm.controls?.['connected'];
  }

  addField(): void {
    const city = this.formBuilder.control('');
    this.connected.push(city);
  }

  removeField(index: number): void {
    this.connected.removeAt(index);
  }

  createId(): string {
    return (Date.now() * Math.random()).toString(36);
  }

  createStation() {
    console.log(this.stationForm.value);
  }
}
