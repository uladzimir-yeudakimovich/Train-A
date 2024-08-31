import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '@shared/models/enums/messages.enum';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}

  open(message: Message) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
