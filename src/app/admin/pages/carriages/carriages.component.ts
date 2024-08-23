import { Carriage } from '@admin/pages/carriages/carriage.model';
import { CarriageService } from '@admin/services/carriage.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

import { CarriageFormComponent } from './carriage-form/carriage-form.component';
import { CarriageListComponent } from './carriage-list/carriage-list.component';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatToolbar,
    CarriageFormComponent,
    CarriageListComponent,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit {
  carriages!: Observable<Carriage[]> | null;

  formVisible = false;

  selectedCarriage: Carriage | null = null;

  constructor(private carriageService: CarriageService) {}

  ngOnInit(): void {
    this.carriages = this.carriageService.loadCarriages();
  }

  showCreateForm() {
    this.selectedCarriage = null;
    this.formVisible = true;
  }

  saveCarriage() {
    this.formVisible = false;
    this.selectedCarriage = null;
  }

  updateCarriage(carriage: Carriage) {
    this.selectedCarriage = carriage;
    this.formVisible = true;
  }
}
