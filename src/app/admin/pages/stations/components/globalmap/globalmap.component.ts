import { StationStore } from '@admin/store/stations.store';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-globalmap',
  standalone: true,
  imports: [],
  templateUrl: './globalmap.component.html',
  styleUrl: './globalmap.component.scss',
})
export class GlobalmapComponent {
  private stationStore = inject(StationStore);
}
