import { CarriageService } from '@admin/services/carriage-management/carriage.service';
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

  @Output() closeForm = new EventEmitter<void>();

  carriageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carriageService: CarriageService,
  ) {
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
    if (this.carriageForm.valid) {
      const carriageData = {
        ...this.carriageForm.value,
        code: this.carriageForm.value.name,
      };

      if (this.carriage) {
        this.carriageService
          .updateCarriage(carriageData)
          .subscribe(() => this.closeForm.emit());
      } else {
        this.carriageService
          .addCarriage(carriageData)
          .subscribe(() => this.closeForm.emit());
      }
    }
  }

  onReset() {
    this.carriageForm.reset();
  }

  onClose() {
    this.closeForm.emit();
  }
}
