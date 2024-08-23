import { ToCitiesPipe } from '@admin/pipes/toCities.pipe';
import { MatMiniFabButton } from '@angular/material/button';
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
  MatMiniFabButton,
  MatIcon,
  ToCitiesPipe,
];
