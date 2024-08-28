import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TimePipe } from '@home/pipes/time.pipe';

export const ordersImports = [
  MatTableModule,
  MatSortModule,
  MatButton,
  DatePipe,
  CurrencyPipe,
  TimePipe,
  MatProgressSpinner,
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
