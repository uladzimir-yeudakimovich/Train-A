import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { stationsImports } from './stations.config';
import { StationStore } from '@admin/store/stations.store';
import { StationLocationTuple } from '@admin/models/station-form.model';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: stationsImports,
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent implements OnInit {
  location = signal<StationLocationTuple>([null, null]);

  constructor(private stationStore: StationStore) {}

  ngOnInit() {
    this.stationStore.getStations();
  }
}
