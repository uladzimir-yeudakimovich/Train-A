import { RailRoute } from '@admin/models/route.model';
import { RouteManagementService } from '@admin/services/route-management/route-management.service';
import { Component, OnInit, signal } from '@angular/core';
import { RouteCardComponent } from '../route-card/route-card.component';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouteCardComponent],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss'
})
export class RouteListComponent implements OnInit {
  routes = signal<RailRoute[]>([]);
  
  constructor(private routeService: RouteManagementService) {}

  ngOnInit() {
    this.routeService.getRoutes().then(routes => this.routes.set(routes));    
  }
}
