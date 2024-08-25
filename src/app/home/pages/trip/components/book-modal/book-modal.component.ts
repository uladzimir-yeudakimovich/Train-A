import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardFooter,
    MatCardContent,
    CurrencyPipe,
    MatDivider,
  ],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent {
  bookItems = input.required<
    {
      carId: string;
      seatNumber: number;
      price: number;
    }[]
  >();

  totalPrice = computed(() => {
    return this.bookItems().reduce((acc, item) => acc + item.price, 0);
  });

  bookClick = output<boolean>();

  onBook(): void {
    console.log('Book clicked', this.bookItems());
    this.bookClick.emit(true);
  }
}
