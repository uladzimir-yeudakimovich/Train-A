import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Message } from '@shared/models/enums/messages.enum';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { SnackBarService } from '@shared/services/snack-bar/snack-bar.service';
import { ProfileService } from '@user/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    const userRole = this.profileService.userRole();
    if (userRole === 'manager') {
      return true;
    }
    this.snackBarService.open(Message.InvalidAccessToken);
    return this.router.createUrlTree([RoutePath.Search]);
  }
}
