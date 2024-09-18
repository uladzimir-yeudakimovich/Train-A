import { Station } from '@admin/models/station.model';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SearchRoutesParams } from '@home/models/search-routes-params.model';
import { SearchStore } from '@home/store/search.store';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';

import { searchFormImports } from './search-form.config';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [searchFormImports],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  stations = input.required<Station[]>();

  readonly currentDateTime: Date = new Date(new Date().setSeconds(0, 0));

  private searchStore = inject(SearchStore);

  private formBuilder = inject(FormBuilder);

  searchForm = this.formBuilder.nonNullable.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    date: [this.currentDateTime],
  });

  constructor(private snackBarService: SnackBarService) {}

  get from(): AbstractControl<string> {
    return this.searchForm.get('from')!;
  }

  get to(): AbstractControl<string> {
    return this.searchForm.get('to')!;
  }

  get date(): AbstractControl<Date> {
    return this.searchForm.get('date')!;
  }

  swapValue(): void {
    this.searchForm.patchValue({ from: this.to.value, to: this.from.value });
  }

  async onSubmit(): Promise<void> {
    const fromStation = this.stations().find(
      ({ city }) => city === this.from.value,
    );

    const toStation = this.stations().find(
      ({ city }) => city === this.to.value,
    );

    let dateTime = this.date.value.getTime();
    if (dateTime < Date.now()) {
      dateTime = Date.now();
    }

    const searchRoutesParams: SearchRoutesParams = {
      fromLatitude: fromStation?.latitude ?? 0,
      fromLongitude: fromStation?.longitude ?? 0,
      toLatitude: toStation?.latitude ?? 0,
      toLongitude: toStation?.longitude ?? 0,
      time: dateTime / 1000,
    };

    await this.searchStore.searchRoutes(searchRoutesParams).catch((error) => {
      this.snackBarService.displayError(error);
    });
  }

  stationsAutocomplete(value: string): Station[] {
    const filterValue = value.toLowerCase();
    return this.stations().filter(({ city }) =>
      city.toLowerCase().includes(filterValue),
    );
  }
}
