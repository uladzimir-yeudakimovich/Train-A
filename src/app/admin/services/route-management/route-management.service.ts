import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { computed, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteManagementService {
  connectedStationsMap = computed(() => {
    const stations = this.stationStore.stationsEntities();
    const stationsMap = this.stationStore.stationsEntityMap();

    return (stationId: number) => {
      if (!stationId) {
        return stations;
      }
      const fromStation = stations[stationId];
      const connectedStations = fromStation.connectedTo.map(
        (connection) => stationsMap[connection.id],
      );
      return connectedStations;
    };
  });
  
  private stationStore = inject(StationStore);

  async getStationsByIds(stationIds: number[]): Promise<Station[]> {
    await this.stationStore.getStations();
    const stationsMap = this.stationStore.stationsEntityMap();
    return stationIds.map((id) => stationsMap[id]);
  }

  async getConnectedStations(stationId: number): Promise<Station[]> {
    const stations = this.stationStore.stationsEntityMap();
    const fromStation = stations[stationId];

    const connectedStations = fromStation.connectedTo.map((connection) => stations[connection.id]);
    return connectedStations;
  }

  async getStationCities(stationIds: number[]): Promise<string[]> {
    const stations = await this.getStationsByIds(stationIds);
    return stations.map((station) => station.city);
  }
}
