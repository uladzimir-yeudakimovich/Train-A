import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [MatButton, MatCard, MatCardFooter, MatCardContent, CurrencyPipe],
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

  sortedBookItems = computed(() => {
    const items = this.bookItems();
    const groupedItems: Record<
      string,
      { carId: string; seatNumber: number; price: number }[]
    > = {};

    // Group items by carId
    items.forEach((item) => {
      if (!groupedItems[item.carId]) {
        groupedItems[item.carId] = [];
      }
      groupedItems[item.carId].push(item);
    });

    // Sort each group by seatNumber
    Object.keys(groupedItems).forEach((carId) => {
      groupedItems[carId].sort((a, b) => a.seatNumber - b.seatNumber);
    });

    // Flatten the grouped and sorted items back into a single array
    return Object.values(groupedItems).flat();
  });

  totalPrice = computed(() => {
    return this.bookItems().reduce((acc, item) => acc + item.price, 0);
  });

  onBook(): void {
    console.log('Booked', this.bookItems());
  }
}
