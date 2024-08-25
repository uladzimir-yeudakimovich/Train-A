import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { getTomorrow } from '@home/utils/getTomorrow.util';

import { searchFormImports } from './search-form.config';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [searchFormImports],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class SearchFormComponent {
  private noFutureValidator = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const { value } = control;

    if (!value) {
      return null;
    }

    const noFuture = Date.now() >= (value as Date).getTime();

    return noFuture ? { noFuture: true } : null;
  };

  searchForm = this.formBuilder.nonNullable.group(
    {
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      time: [getTomorrow(), [Validators.required, this.noFutureValidator]],
    },
    { updateOn: 'blur' },
  );

  constructor(private formBuilder: FormBuilder) {}

  get from(): AbstractControl<string> {
    return this.searchForm.get('from')!;
  }

  get to(): AbstractControl<string> {
    return this.searchForm.get('to')!;
  }

  get time(): AbstractControl<Date> {
    return this.searchForm.get('time')!;
  }

  get timeErrorMessage(): string {
    if (this.time.hasError('required')) {
      return 'Required';
    }

    if (this.time.hasError('noFuture')) {
      return 'Only future days';
    }

    return '';
  }

  swapValue(): void {
    this.searchForm.patchValue({ from: this.to.value, to: this.from.value });
  }

  onSubmit(): void {}
}
