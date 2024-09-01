import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CarSeatComponent } from '@shared/components/car-seat/car-seat.component';

import { BookModalComponent } from './components/book-modal/book-modal.component';
import { CarriageListComponent } from './components/carriage-list/carriage-list.component';

export const tripImports = [
  CarSeatComponent,
  DatePipe,
  CarriageListComponent,
  MatTabsModule,
  BookModalComponent,
  MatIcon,
  MatListItem,
  CurrencyPipe,
  MatIconButton,
  MatButton,
  MatProgressSpinner,
];
