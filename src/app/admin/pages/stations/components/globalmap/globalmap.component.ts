import { StationStore } from '@admin/store/stations.store';
import { Component, computed, inject } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, LatLngTuple, LeafletMouseEvent, marker, tileLayer } from 'leaflet';

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
    this.stationStore
      .locations()
      .map(({ location, label }) => marker(location as LatLngTuple).bindPopup(label)),
  );

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 4,
    center: latLng(32.766284, -96.760866),
  };

  onLeafLetClick(event: LeafletMouseEvent) {
    console.dir(event);
  }
}
