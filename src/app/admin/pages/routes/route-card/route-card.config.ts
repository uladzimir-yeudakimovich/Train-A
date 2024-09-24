import { JoinWithDashPipe } from '@admin/pipes/join-with-dash.pipe';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { RouteFormComponent } from '../route-form/route-form.component';

export const routeCardImports = [
  MatIcon,
  MatToolbarRow,
  MatToolbar,
  MatButton,
  JoinWithDashPipe,
  RouteFormComponent,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatProgressSpinner,
  RouterLink,
];
