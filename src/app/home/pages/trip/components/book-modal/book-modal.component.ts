import { Component, computed, input, output } from '@angular/core';
import { BookItem } from '@home/models/trip.models';

import { bookModalImports } from './book-modal.config';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: bookModalImports,
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent {
  bookItems = input.required<BookItem[]>();

  totalPrice = computed(() => {
    return this.bookItems().reduce((acc, item) => acc + item.price, 0);
  });

  bookClick = output<boolean>();

  onBook(): void {
    // TODO: add message about only 1 seat
    this.bookClick.emit(true);
  }
}
