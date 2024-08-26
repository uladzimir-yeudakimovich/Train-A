import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouteModalData } from '@home/models/trip.models';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDivider,
    MatIcon,
  ],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent {
  readonly dialogRef = inject(MatDialogRef<RouteModalComponent>);

  readonly data = inject<RouteModalData>(MAT_DIALOG_DATA);
}
