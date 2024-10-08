import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TripInfo } from '@home/models/trip.models';

import { orderDialogImports } from './order-dialog.config';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: orderDialogImports,
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDialogComponent {
  readonly dialogRef = inject(MatDialogRef<OrderDialogComponent>);

  readonly data = inject<TripInfo>(MAT_DIALOG_DATA);
}
