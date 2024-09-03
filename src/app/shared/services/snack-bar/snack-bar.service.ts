import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrorMessage } from '@shared/utils/erorr-message.util';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}

  open(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

  displayError(error: HttpErrorResponse) {
    const message = getErrorMessage(error);
    this.open(message);
  }
}
