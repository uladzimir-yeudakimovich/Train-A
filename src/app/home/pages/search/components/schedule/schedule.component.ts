import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { scheduleImports } from './schedule.config';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: scheduleImports,
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  scheduleData = inject(MAT_DIALOG_DATA);
}
