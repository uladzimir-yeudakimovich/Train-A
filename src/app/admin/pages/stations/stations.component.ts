import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { stationsImports } from './stations.config';
import { StationStore } from '@admin/store/stations.store';

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

  ngOnInit() {
    this.stationStore.getStations();
  }
}
