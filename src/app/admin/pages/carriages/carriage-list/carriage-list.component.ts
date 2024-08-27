import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
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
  ],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
})
export class CarriageListComponent {
  carriages = input.required<Carriage[]>();

  selectedCarriageCode = signal<string | null>(null);

  headerVisible = signal<boolean>(true);

  store = inject(CarriageStore);

  isShowForm(carriageCode: string) {
    const isSameCarriage = this.selectedCarriageCode() === carriageCode;
    this.selectedCarriageCode.set(isSameCarriage ? null : carriageCode);
    this.headerVisible.update((value) => !value);
  }

  updateCarriage(newCarriage: Carriage): void {
    this.selectedCarriageCode.set(null);
    this.store.updateCarriage(newCarriage);
    this.headerVisible.set(true);
  }
}
