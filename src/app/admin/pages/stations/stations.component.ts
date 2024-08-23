<<<<<<< HEAD
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { stationsImports } from './stations.config';
import { StationStore } from '@admin/store/stations.store';
=======
>>>>>>> a49111394f8bdce088e31610f124092033db5f35
import { StationGeoLocation } from '@admin/models/station-form.model';
import { StationStore } from '@admin/store/stations.store';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';

import { stationsImports } from './stations.config';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: stationsImports,
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent implements OnInit {
  private stationStore = inject(StationStore);

  location = signal<StationGeoLocation>([0, 0]);

  ngOnInit() {
    this.stationStore.getStations();
  }
}
