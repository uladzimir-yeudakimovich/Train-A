import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { RouteFormComponent } from './route-form/route-form.component';
import { RouteListComponent } from './route-list/route-list.component';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [RouteListComponent, MatButton, RouteFormComponent],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent {
  displayCreateRouteForm = signal<boolean>(false);

  toggleRouteForm() {
    this.displayCreateRouteForm.update((value) => !value);
  }
}
