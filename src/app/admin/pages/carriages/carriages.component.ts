import { Component, OnInit } from '@angular/core';
import { CarriageService } from '../../services/carriage.service';
import { MatToolbar } from '@angular/material/toolbar';
import { CarriageFormComponent } from './carriage-form/carriage-form.component';
import { CarriageListComponent } from './carriage-list/carriage-list.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Carriage } from '@admin/pages/carriages/carriage.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatToolbar, CarriageFormComponent, CarriageListComponent],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss'
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
