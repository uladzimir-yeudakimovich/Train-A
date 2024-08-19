import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { stationCardsImports } from './station-cards.config';
import { StationInterface } from '@admin/models/station.model';
import { AdminService } from '@admin/services/admin.service';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-station-cards',
  standalone: true,
  imports: stationCardsImports,
  templateUrl: './station-cards.component.html',
  styleUrl: './station-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationCardsComponent {
  stations = input.required<StationInterface[]>();

  constructor(
    private adminService: AdminService,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  ) {}

  deleteStation(id: number) {
    this.adminService
      .deleteStation(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.cdr.detectChanges);
  }
}
