import { NgFor, NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [NgIf, NgFor, MatList, MatListItem, MatButton, TrainCarComponent],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
})
export class CarriageListComponent {
  carriages = input.required<Carriage[]>();

  store = inject(CarriageStore);

  getCarriage(code: string) {
    return this.store.getCarriageSignal(code);
  }
}
