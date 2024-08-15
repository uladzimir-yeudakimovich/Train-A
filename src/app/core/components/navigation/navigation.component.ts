import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';

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
  navItems = [
    { label: 'Home', link: '/', exact: true },
    { label: 'Profile', link: '/profile' },
    { label: 'My Orders', link: '/orders' },
  ];

  authItems = [
    { label: 'Admin', link: '/admin' },
    { label: 'Sign In', link: '/signin' },
    { label: 'Sign Up', link: '/signup' },
  ];
}
