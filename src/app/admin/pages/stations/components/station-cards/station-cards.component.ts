<<<<<<< HEAD
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { stationCardsImports } from './station-cards.config';
=======
>>>>>>> a49111394f8bdce088e31610f124092033db5f35
import { StationStore } from '@admin/store/stations.store';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
