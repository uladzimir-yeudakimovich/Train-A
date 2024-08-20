import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput, MatLabel, MatError } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatOption } from '@angular/material/select';

export const stationFormImports = [
  ReactiveFormsModule,
  MatFormField,
  MatSuffix,
  MatInput,
  MatError,
  MatLabel,
  MatButton,
  MatIconButton,
  MatIcon,
  MatSelect,
  MatOption,
];
