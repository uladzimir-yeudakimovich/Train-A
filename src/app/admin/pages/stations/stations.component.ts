import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StationFormComponent } from './components/station-form/station-form.component';
import { AdminService } from '@admin/services/admin.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StationCardsComponent } from './components/station-card/station-cards.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [StationFormComponent, StationCardsComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent {
  stations = toSignal(this.adminService.getStations(), { initialValue: [] });

  constructor(private adminService: AdminService) {}
}
