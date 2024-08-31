import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchCard } from '@home/models/search-card.model';

import { searchCardsImports } from './search-cards.config';

@Component({
  selector: 'app-search-cards',
  standalone: true,
  imports: searchCardsImports,
  templateUrl: './search-cards.component.html',
  styleUrl: './search-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardsComponent {
  schedule = inject(MatDialog);

  cards = input.required<SearchCard[]>();

  openModal(): void {
    this.schedule.open();
  }
}
