import { Carriage } from '@admin/pages/carriages/carriage.model';
import { CarriageService } from '@admin/services/carriage.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carriage-form',
  standalone: true,
  imports: [],
  templateUrl: './carriage-form.component.html',
  styleUrl: './carriage-form.component.scss'
})

export class CarriageFormComponent implements OnInit {
  @Input() carriage: Carriage | null = null;
  @Output() saveCarriage = new EventEmitter<void>();
  carriageForm: FormGroup;

  constructor(private fb: FormBuilder, private carriageService: CarriageService) {
    this.carriageForm = this.fb.group({
      name: ['', Validators.required],
      rows: [0, [Validators.required, Validators.min(1)]],
      leftSeats: [0, [Validators.required, Validators.min(1)]],
      rightSeats: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.carriage) {
      this.carriageForm.patchValue(this.carriage);
    }
  }

  save() {
    if (this.carriageForm.valid) {
      const carriageData = { ...this.carriageForm.value, code: this.carriage?.code ?? '' };

      if (this.carriage) {
        this.carriageService.updateCarriage(carriageData).subscribe(() => this.saveCarriage.emit());
      } else {
        this.carriageService.addCarriage(carriageData).subscribe(() => this.saveCarriage.emit());
      }
    }
  }
}
