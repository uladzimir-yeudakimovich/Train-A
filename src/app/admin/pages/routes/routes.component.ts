import { RouteFormComponent } from '@admin/components/route-form/route-form.component';
import { RouteListComponent } from '@admin/components/route-list/route-list.component';
import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

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
