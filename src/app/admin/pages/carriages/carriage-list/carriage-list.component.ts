import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { CarriageFormComponent } from '../carriage-form/carriage-form.component';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [NgIf, NgFor, MatList, MatListItem, MatButton, TrainCarComponent, CarriageFormComponent],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
})
export class CarriageListComponent {
  carriages = input.required<Carriage[]>();

  formVisible = signal<boolean>(false);

  headerVisible = signal<boolean>(true);

  store = inject(CarriageStore);

  isShowForm() {
    this.formVisible.update((value) => !value);
    this.headerVisible.update((value) => !value);
  }

  updateCarriage(newCarriage: Carriage): void {
    this.formVisible.set(false);
    this.store.updateCarriage(newCarriage);
    this.headerVisible.update((value) => !value);
  }
}
