import { Component } from '@angular/core';
import { RouteListComponent } from "@admin/components/route-list/route-list.component";

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [RouteListComponent],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent {

}
