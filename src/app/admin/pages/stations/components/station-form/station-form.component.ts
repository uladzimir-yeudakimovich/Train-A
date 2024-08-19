import { Component } from '@angular/core';
import { stationFormImports } from './station-form.config';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: stationFormImports,
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
})
export class StationFormComponent {
  stationForm = this.formBuilder.nonNullable.group(
    {
      city: [''],
      latitude: [null],
      longitude: [null],
      connected: this.formBuilder.array([this.formBuilder.control('')]),
    },
    { updateOn: 'blur' },
  );

  constructor(private formBuilder: FormBuilder) {}

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

  addCity(): void {
    const city = this.formBuilder.control('');
    this.connected.push(city);
  }

  removeCity(index: number): void {
    this.connected.removeAt(index);
  }

  createId(): string {
    return (Date.now() * Math.random()).toString(36);
  }
}
