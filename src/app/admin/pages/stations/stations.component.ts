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
  location = signal<StationGeoLocation>([0, 0]);

  constructor(private stationStore: StationStore) {}

  ngOnInit() {
    this.stationStore.getStations();
  }
}
