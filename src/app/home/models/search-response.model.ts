import { SearchRoute } from './search-route.model';
import { SearchStation } from './search-station.model';

export interface SearchResponse {
  from: SearchStation | null;
  routes: SearchRoute[];
  to: SearchStation | null;
}
