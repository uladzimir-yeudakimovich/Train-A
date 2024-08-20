import { Station } from '@admin/models/station.model';
import { StationStore } from '@admin/store/stations/stations.store';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteManagementService {
  private stationsStore = inject(StationStore);

  async getStationsByIds(stationIds: number[]): Promise<Station[]> {
    await this.stationsStore.getStations();
    const stationsMap = this.stationsStore.stationsEntityMap();
    return stationIds.map((id) => stationsMap[id]);
  }

  async getConnectedStations(stationId: number): Promise<Station[]> {
    const stations = this.stationsStore.stationsEntityMap();
    const fromStation = stations[stationId];

    const connectedStations = fromStation.connectedTo.map((connection) => stations[connection.id]);
    return connectedStations;
  }

  async getStationCities(stationIds: number[]): Promise<string[]> {
    const stations = await this.getStationsByIds(stationIds);
    return stations.map((station) => station.city);
  }
}
