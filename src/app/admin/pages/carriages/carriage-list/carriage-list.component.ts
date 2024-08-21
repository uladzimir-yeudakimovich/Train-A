import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { CarriagesStore } from '@shared/store/carriages.store';
import { Carriage } from '../carriage.model';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [NgIf, NgFor, MatList, MatListItem, MatButton, TrainCarComponent],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss'
})
export class CarriageListComponent {
  @Input() carriages!: Carriage[] | null;
  @Output() updateCarriage = new EventEmitter<Carriage>();

  store = inject(CarriagesStore);

  onUpdate(carriage: Carriage) {
    this.updateCarriage.emit(carriage);
  }
}
