import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';

export const routeFormImports = [
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatButton,
  ReactiveFormsModule,
  MatIcon,
  MatIconButton,
  MatError,
];
