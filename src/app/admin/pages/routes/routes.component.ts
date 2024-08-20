import { Component, signal } from '@angular/core';
import { RouteListComponent } from "@admin/components/route-list/route-list.component";
import { MatButton } from '@angular/material/button';
import { RouteFormComponent } from '@admin/components/route-form/route-form.component';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [RouteListComponent, MatButton, RouteFormComponent],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent {
  displayCreateRouteForm = signal<boolean>(false);

  toggleRouteForm() {
    this.displayCreateRouteForm.update((value) => !value);
  }
}
