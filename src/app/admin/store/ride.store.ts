import { RouteInformation } from '@admin/interfaces';
import { signalStore, withState } from '@ngrx/signals';

export interface RidesState extends RouteInformation {
  loading: boolean;
}

const initialState: RidesState = {
  routeId: 0,
  stations: [],
  schedule: [],
  loading: false,
};

export const RidesStore = signalStore({ providedIn: 'root' }, withState(initialState));
