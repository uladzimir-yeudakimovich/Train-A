import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';
import { NavigationLink } from '@shared/models/interfaces/navigation.model';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgFor,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navItems: NavigationLink[] = [
    { label: 'Home', link: RoutePath.Search, exact: true },
    { label: 'Profile', link: RoutePath.UserProfile },
    { label: 'My Orders', link: RoutePath.Orders },
  ];

  authItems = [
    { label: 'Admin', link: RoutePath.Admin },
    { label: 'Sign In', link: RoutePath.Login },
    { label: 'Sign Up', link: RoutePath.Registration },
  ];
}
