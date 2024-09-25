import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TimePipe } from '@home/pipes/time.pipe';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

export const ordersImports = [
  MatTableModule,
  MatSortModule,
  MatButton,
  DatePipe,
  CurrencyPipe,
  TimePipe,
  SpinnerComponent,
];

export const displayedColumns = [
  'startStation',
  'startTime',
  'endStation',
  'endTime',
  'tripDuration',
  'carType',
  'carNumber',
  'seatNumber',
  'price',
  'actions',
];
