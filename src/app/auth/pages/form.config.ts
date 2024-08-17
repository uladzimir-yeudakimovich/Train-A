import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardActions } from '@angular/material/card';

export const formImports = [
  ReactiveFormsModule,
  MatFormField,
  MatError,
  MatInput,
  MatLabel,
  MatButton,
  MatAnchor,
  RouterLink,
  MatCard,
  MatCardActions,
];
