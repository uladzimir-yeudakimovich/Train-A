import { Station } from '@admin/models/station.model';
import { Component, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { HomeStore } from '@home/store/home.store';
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
  stations = input.required<Station[]>();

  private homeStore = inject(HomeStore);

  private formBuilder = inject(FormBuilder);

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

  searchForm = this.formBuilder.nonNullable.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    time: [getTomorrow(), [Validators.required, this.noFutureValidator]],
  });

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

  async onSubmit(): Promise<void> {
    const fromStation = this.stations().find(
      ({ city }) => city === this.from.value,
    ) as Station;

    const toStation = this.stations().find(
      ({ city }) => city === this.to.value,
    ) as Station;

    const searchRoutesParams: SearchRoutesParams = {
      fromLatitude: fromStation.latitude,
      fromLongitude: fromStation.longitude,
      toLatitude: toStation.latitude,
      toLongitude: toStation.longitude,
      time: 0,
    };

    await this.homeStore.searchRoutes(searchRoutesParams);
  }
}
