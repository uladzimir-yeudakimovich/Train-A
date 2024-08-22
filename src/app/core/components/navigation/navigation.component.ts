import { ChangeDetectorRef, Component, effect } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { NavigationLink } from '@shared/models/interfaces/navigation.model';
import { ProfileService } from '@user/services/profile.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatNavList, MatListItem, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navItems: NavigationLink[] = [];

  authItems: NavigationLink[] = [];

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => this.updateNavigation());
  }

  updateNavigation() {
    const userRole = this.profileService.userRole();
    const isLogin = this.authService.isLogin();

    this.navItems = [
      { label: 'Home', link: RoutePath.Search, exact: true, isShow: true },
      { label: 'Profile', link: RoutePath.UserProfile, isShow: isLogin },
      {
        label: 'Orders',
        link: RoutePath.Orders,
        isShow: isLogin,
      },
    ];

    this.authItems = [
      { label: 'Admin', link: RoutePath.Admin, isShow: userRole === 'manager' },
      { label: 'Sign In', link: RoutePath.Login, isShow: !isLogin },
      { label: 'Sign Up', link: RoutePath.Registration, isShow: !isLogin },
    ];
    this.cdr.detectChanges();
  }
}
