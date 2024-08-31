import { Component, computed, input, output } from '@angular/core';
import { BookItem } from '@home/models/trip.models';
import { Message } from '@shared/models/enums/messages.enum';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';

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

  constructor(private snackBarService: SnackBarService) {}

  onBook(): void {
    if (this.bookItems().length !== 1) {
      this.snackBarService.open(Message.SelectedTooManySeats);
      return;
    }
    this.bookClick.emit(true);
  }
}
