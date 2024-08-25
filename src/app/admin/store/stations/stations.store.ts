import { Station } from '@admin/models/station.model';
import { AdminService } from '@admin/services/admin/admin.service';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import {
  removeEntity,
  setAllEntities,
  setEntity,
  updateAllEntities,
  withEntities,
} from '@ngrx/signals/entities';

import { stationConfig } from './stations.config';

export const StationStore = signalStore(
  { providedIn: 'root' },
  withEntities(stationConfig),

  withMethods((store, adminService = inject(AdminService)) => ({
    async getStations() {
      if (!store.stationsIds().length) {
        const stations = await adminService.loadStations();
        patchState(store, setAllEntities(stations, stationConfig));
      }
    },

    async deleteStation(id: number): Promise<void> {
      await adminService.deleteStation(id);
      patchState(store, removeEntity(id, stationConfig));
      this.deleteStationFromConnected(id);
    },

    async addStation(partialStation: Partial<Station>): Promise<void> {
      const newStation = await adminService.postStation(partialStation);
      patchState(store, setEntity(newStation, stationConfig));
      this.addStationToConnected(newStation);
    },

    deleteStationFromConnected(stationToDeleteId: number): void {
      const stations = store.stationsEntities();
      const updatedStations = stations.map((station) => {
        const connectedTo = station.connectedTo.filter(
          (connection) => connection.id !== stationToDeleteId,
        );
        return { ...station, connectedTo };
      });
      patchState(store, setAllEntities(updatedStations, stationConfig));
    },

    addStationToConnected(stationToConnect: Station): void {
      const stations = store.stationsEntityMap();
      const connectedStations = stationToConnect.connectedTo.map(
        (connection) => stations[connection.id],
      );
      const updatedStations = connectedStations.map((connectedStation) => {
        const connectedTo = [
          ...connectedStation.connectedTo,
          { id: stationToConnect.id },
        ];
        return { ...connectedStation, connectedTo };
      });
      patchState(
        store,
        updateAllEntities((station) => {
          const updatedStation = updatedStations.find(
            (updated) => updated.id === station.id,
          );
          return updatedStation ?? station;
        }, stationConfig),
      );
    },
  })),

  withComputed(({ stationsEntities }) => ({
    locations: computed(() =>
      stationsEntities().map(({ city, latitude, longitude }) => ({
        location: [latitude, longitude],
        label: city,
      })),
    ),
  })),
);
