import { StationGeoLocation } from '@admin/models/station-form.model';
import { StationStore } from '@admin/store/stations.store';
import { Component, computed, model } from '@angular/core';
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

  constructor(private stationStore: StationStore) {}

  onLeafLetClick({ latlng }: LeafletMouseEvent) {
    const location: StationGeoLocation = [latlng.lat, latlng.lng];
    this.latLngOutput.set(location);
  }
}
