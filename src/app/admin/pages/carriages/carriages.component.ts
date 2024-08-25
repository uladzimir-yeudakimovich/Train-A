import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

import { CarriageFormComponent } from './carriage-form/carriage-form.component';
import { CarriageListComponent } from './carriage-list/carriage-list.component';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [
    MatButton,
    CarriageFormComponent,
    CarriageListComponent,
    MatProgressSpinner,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit {
  formVisible = signal<boolean>(false);

  carriages!: Signal<Carriage[]>;

  private carriageStore = inject(CarriageStore);

  ngOnInit(): void {
    this.carriageStore.getCarriages();
    this.carriages = this.carriageStore.carriagesEntities;
  }

  showCreateForm() {
    this.formVisible.update((value) => !value);
  }
}
