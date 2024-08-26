import { Component, computed, input, output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private snackBar: MatSnackBar) {}

  onBook(): void {
    if (this.bookItems().length !== 1) {
      this.snackBar.open('Please select only one seat', 'Close', {
        duration: 5000,
      });
      return;
    }
    this.bookClick.emit(true);
  }
}
