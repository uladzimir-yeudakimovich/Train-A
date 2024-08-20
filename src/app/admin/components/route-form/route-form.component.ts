import { Component, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent implements OnInit {
  // TODO: add Trash button to the last select input
  // TODO: list connectedTo stations in select inputs

  closeForm = output<boolean>();
  routeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      stations: this.formBuilder.array([this.createFormControl()], this.minArrayLength(3)),
      carriages: this.formBuilder.array([this.createFormControl()], this.minArrayLength(3)),
    });
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

  onAddStation(idx: number) {
    this.updateFormArray(this.stations, idx);
  }

  onAddCarriage(idx: number) {
    this.updateFormArray(this.carriages, idx);
  }

  get stations() {
    return this.routeForm.get('stations') as FormArray;
  }

  get carriages() {
    return this.routeForm.get('carriages') as FormArray;
  }

  private updateFormArray(array: FormArray, idx: number) {
    const isLast = idx === array.length - 1;
    if (!isLast) return;

    if (array.length > 1) {
      array.at(array.length - 2).disable();
    }
    array.push(this.createFormControl());
  }

  private createFormControl() {
    return new FormControl('');
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
