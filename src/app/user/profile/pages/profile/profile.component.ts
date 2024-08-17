import { Component } from '@angular/core';
import { UserProfileComponent } from '@user/profile/components/user-profile/user-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
