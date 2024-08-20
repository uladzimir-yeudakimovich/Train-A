import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatNavList, MatListItem, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = [
    { label: 'Stations', link: RoutePath.AdminStations, exact: true },
    { label: 'Carriages', link: RoutePath.AdminCarriages },
    { label: 'Routes', link: RoutePath.AdminRoutes },
    { label: 'Ride Management', link: RoutePath.AdminRideManagement },
  ];
}
