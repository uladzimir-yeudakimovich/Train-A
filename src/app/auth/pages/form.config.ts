import { ReactiveFormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { RouterLink } from '@angular/router';

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
