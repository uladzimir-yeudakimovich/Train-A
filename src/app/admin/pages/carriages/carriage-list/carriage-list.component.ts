import { RemoveWhitespacePipe } from '@admin/pipes/remove-whitespace/remove-whitespace.pipe';
import { sanitizeId } from '@admin/utils/specialCharactersSanitizer';
import {
  AfterViewInit,
  Component,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { TrainCarComponent } from '@shared/components/train-car/train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { CarriageStore } from '@shared/store/carriages/carriages.store';

import { CarriageFormComponent } from '../carriage-form/carriage-form.component';

@Component({
  selector: 'app-carriage-list',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatButton,
    TrainCarComponent,
    CarriageFormComponent,
    MatCard,
    MatIcon,
    RemoveWhitespacePipe,
  ],
  templateUrl: './carriage-list.component.html',
  styleUrl: './carriage-list.component.scss',
})
export class CarriageListComponent implements AfterViewInit {
  carriages = input.required<Carriage[]>();

  selectedCarriageCode = signal<string | null>(null);

  store = inject(CarriageStore);

  constructor(
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  toggleForm(carriageCode: string) {
    const currentSelection = this.selectedCarriageCode();
    this.selectedCarriageCode.set(
      currentSelection === carriageCode ? null : carriageCode,
    );
  }

  updateCarriage(updatedCarriage: Carriage): void {
    this.store.updateCarriage(updatedCarriage);
    this.selectedCarriageCode.set(null);
  }

  closeForm() {
    this.selectedCarriageCode.set(null);
  }

  ngAfterViewInit(): void {
    const { fragment } = this.activatedRoute.snapshot;
    if (fragment) {
      setTimeout(() => this.scrollToCarriage(fragment), 1000);
    }
  }

  private scrollToCarriage(carriageName: string): void {
    const sanitizedCarriage = sanitizeId(carriageName);
    const element = this.renderer.selectRootElement(
      `#car${sanitizedCarriage}`,
      true,
    );
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 100;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
