import { RailRoute } from '@admin/models/route.model';
import { RouteManagementService } from '@admin/services/route-management/route-management.service';
import { Component, input, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [MatIcon, MatToolbarRow, MatToolbar, MatButton],
  templateUrl: './route-card.component.html',
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent implements OnInit {
  route = input.required<RailRoute>();
  cities = signal<string[]>([]);

  constructor(
    private routeService: RouteManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log('route(): ', this.route());
    this.routeService.getStationCities(this.route().path).then(cities => this.cities.set(cities)); 
  }

  onAssignRideClick(): void {
    const routeId = this.route().id;
    this.router.navigate([RoutePath.AdminRoutes, routeId], { relativeTo: this.activatedRoute });
  }
}
