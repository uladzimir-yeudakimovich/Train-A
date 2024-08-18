import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLogin = this.authService.isLogin();
    if (isLogin) {
      return true;
    } else {
      return this.router.createUrlTree([RoutePath.Login]);
    }
  }
}
