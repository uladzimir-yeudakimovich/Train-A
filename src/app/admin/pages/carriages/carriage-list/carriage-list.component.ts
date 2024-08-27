import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

import { CarriageFormComponent } from '../carriage-form/carriage-form.component';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatList,
    MatListItem,
    MatButton,
    TrainCarComponent,
    CarriageFormComponent,
    MatCard,
    MatIcon,
  ],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
})
export class CarriageListComponent {
  carriages = input.required<Carriage[]>();

  selectedCarriageCode = signal<string | null>(null);

  store = inject(CarriageStore);

  toggleForm(carriageCode: string) {
    const currentSelection = this.selectedCarriageCode();
    this.selectedCarriageCode.set(
      currentSelection === carriageCode ? null : carriageCode,
    );
  }

  updateCarriage(updatedCarriage: Carriage): void {
    this.store.updateCarriage(updatedCarriage);
    this.selectedCarriageCode.set(null);
  }

  closeForm() {
    this.selectedCarriageCode.set(null);
  }
}
