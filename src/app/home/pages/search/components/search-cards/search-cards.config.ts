import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { ToTimePipe } from '@home/pipes/toTime.pipe';

export const searchCardsImports = [
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardTitle,
  MatCardSubtitle,
  MatIcon,
  MatDivider,
  DatePipe,
  CurrencyPipe,
  ToTimePipe,
];
