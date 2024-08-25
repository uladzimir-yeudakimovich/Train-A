import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    DatePipe,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss',
})
export class OrderDialogComponent {
  readonly dialogRef = inject(MatDialogRef<OrderDialogComponent>);

  readonly data = inject(MAT_DIALOG_DATA);
}
