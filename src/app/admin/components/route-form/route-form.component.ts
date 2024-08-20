import { Component, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [MatFormFieldModule, MatOptionModule, MatSelectionList, MatSelectModule, MatButton, ReactiveFormsModule],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss',
})
export class RouteFormComponent implements OnInit {
  // TODO: disable select inputs except the last one
  // TODO: add Trash button to the last select input
  // TODO: list connectedTo stations in select inputs

  closeForm = output<boolean>();
  routeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      stations: this.formBuilder.array([this.createFormControl()]),
      carriages: this.formBuilder.array([this.createFormControl()]),
    });
  }

  onSubmit() {
    console.log('Submitted', this.routeForm.value);
  }

  onReset() {
    this.routeForm.reset();
    this.stations.clear();
    this.carriages.clear();
    this.stations.push(this.createFormControl());
    this.carriages.push(this.createFormControl());
  }

  onClose() {
    this.closeForm.emit(true);
  }

  onAddStation() {
    this.stations.push(this.createFormControl());
  }

  onAddCarriage() {
    this.carriages.push(this.createFormControl());
  }

  get stations() {
    return this.routeForm.get('stations') as FormArray;
  }

  get carriages() {
    return this.routeForm.get('carriages') as FormArray;
  }

  private createFormControl() {
    return this.formBuilder.control('', Validators.required);
  }
}
