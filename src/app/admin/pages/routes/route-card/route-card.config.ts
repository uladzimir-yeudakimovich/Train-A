import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

import { RouteFormComponent } from '../route-form/route-form.component';

export const routeCardImports = [
  MatIcon,
  MatToolbarRow,
  MatToolbar,
  MatButton,
  RouteFormComponent,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  RouterLink,
  SpinnerComponent,
];
