import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ToCitiesPipe } from '@admin/pipes/toCities.pipe';

export const stationCardsImports = [
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatMiniFabButton,
  MatIcon,
  ToCitiesPipe,
];
