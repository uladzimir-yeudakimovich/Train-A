import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { stationCardsImports } from './station-cards.config';
import { StationStore } from '@admin/store/stations.store';

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

  stations = computed(() => this.stationStore.stationsEntities());

  deleteStation(id: number): void {
    this.stationStore.deleteStation(id);
  }
}
