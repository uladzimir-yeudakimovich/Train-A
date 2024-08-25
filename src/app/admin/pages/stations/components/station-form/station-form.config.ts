import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

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
