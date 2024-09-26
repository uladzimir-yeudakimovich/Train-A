import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

export const routeModalImports = [
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatButtonModule,
  MatDivider,
  MatIcon,
  DatePipe,
  MatStepperModule,
  SpinnerComponent,
];
