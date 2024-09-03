import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ToTimePipe } from '@home/pipes/toTime.pipe';

export const searchCardsImports = [
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardTitle,
  MatCardSubtitle,
  MatButton,
  MatIcon,
  MatDivider,
  DatePipe,
  CurrencyPipe,
  ToTimePipe,
  RouterLink,
  MatTabsModule,
];
