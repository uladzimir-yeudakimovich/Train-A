import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatError,
  MatFormField,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';

export const searchFormImports = [
  ReactiveFormsModule,
  MatFormField,
  MatError,
  MatPrefix,
  MatInput,
  MatLabel,
  MatButton,
  MatMiniFabButton,
  MatIcon,
  MatDatepicker,
  MatDatepickerToggle,
  MatDatepickerInput,
  MatAutocompleteModule,
];
