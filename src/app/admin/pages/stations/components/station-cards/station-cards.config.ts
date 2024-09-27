import { RemoveWhitespacePipe } from '@admin/pipes/remove-whitespace/remove-whitespace.pipe';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

export const stationCardsImports = [
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatIcon,
  MatIconButton,
  MatButton,
  RemoveWhitespacePipe,
];
