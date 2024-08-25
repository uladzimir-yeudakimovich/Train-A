import { StationGeoLocation } from '@admin/models/station-form.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { Component, computed, inject, model } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {
  latLng,
  LatLngTuple,
  LeafletMouseEvent,
  marker,
  tileLayer,
} from 'leaflet';

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
      .map(({ location, label }) =>
        marker(location as LatLngTuple).bindPopup(label),
      ),
  );

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
      }),
    ],
    zoom: 2,

    center: latLng(52.2277, 21.0662),
  };

  latLngOutput = model<StationGeoLocation>();

  onLeafLetClick({ latlng }: LeafletMouseEvent) {
    const location: StationGeoLocation = [latlng.lat, latlng.lng];
    this.latLngOutput.set(location);
  }
}
