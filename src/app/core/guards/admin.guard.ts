import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ProfileService } from '@user/profile/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

  constructor(private profileService: ProfileService) {}

  canActivate(): boolean {
    const userRole = this.profileService.userRole();
    if (userRole === 'manager') {
      return true;
    } else {
      return false;
    }
  }
}
