import { StationStore } from '@admin/store/stations.store';
import { Component, computed, inject } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-globalmap',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './globalmap.component.html',
  styleUrl: './globalmap.component.scss',
})
export class GlobalmapComponent {
  private stationStore = inject(StationStore);

  markers = computed(() =>
    this.stationStore.locations().map((location) => marker(location as [number, number])),
  );

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909),
  };

  onClick(event: Event) {
    console.log(event);
  }
}
