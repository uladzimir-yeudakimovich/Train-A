import { StationStore } from '@admin/store/stations.store';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { stationCardsImports } from './station-cards.config';

@Component({
  selector: 'app-station-cards',
  standalone: true,
  imports: stationCardsImports,
  templateUrl: './station-cards.component.html',
  styleUrl: './station-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationCardsComponent {
  private stationStore = inject(StationStore);

  stations = this.stationStore.stationsEntities;

  deleteStation(id: number): void {
    this.stationStore.deleteStation(id);
  }
}
