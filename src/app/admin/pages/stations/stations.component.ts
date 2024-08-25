import { StationGeoLocation } from '@admin/models/station-form.model';
import { StationStore } from '@admin/store/stations/stations.store';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { GlobalmapComponent } from './components/globalmap/globalmap.component';
import { StationCardsComponent } from './components/station-cards/station-cards.component';
import { StationFormComponent } from './components/station-form/station-form.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [GlobalmapComponent, StationCardsComponent, StationFormComponent],
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
