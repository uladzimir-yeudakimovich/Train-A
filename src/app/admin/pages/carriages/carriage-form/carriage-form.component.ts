import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Carriage } from '@shared/models/interfaces/carriage.model';

@Component({
  selector: 'app-carriage-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatError,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './carriage-form.component.html',
  styleUrl: './carriage-form.component.scss',
})
export class CarriageFormComponent implements OnInit {
  @Input() carriage: Carriage | null = null;

  @Output() addCarriage = new EventEmitter<Carriage>();

  @Output() updateCarriage = new EventEmitter<Carriage>();

  @Output() closeForm = new EventEmitter<void>();

  carriageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.carriageForm = this.fb.group({
      name: ['', Validators.required],
      rows: [0, [Validators.required, Validators.min(1)]],
      leftSeats: [0, [Validators.required, Validators.min(1)]],
      rightSeats: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this.carriage) {
      this.carriageForm.patchValue(this.carriage);
    }
  }

  onSave() {
    if (this.carriageForm.valid && !this.carriageForm.pristine) {
      const newCarriage = {
        code: this.carriage ? this.carriage.code : '',
        ...this.carriageForm.value,
      };

      if (!this.carriage) {
        this.addCarriage.emit(newCarriage);
      } else {
        this.updateCarriage.emit(newCarriage);
      }
    }
  }

  onReset() {
    this.carriageForm.reset();
  }

  onClose() {
    this.closeForm.emit();
  }

  isUpdateDisabled(): boolean {
    return this.carriageForm.pristine || !this.carriageForm.valid;
  }
}
