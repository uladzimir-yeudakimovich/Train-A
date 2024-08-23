import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { emailValidator } from '@auth/validators/email.validator';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { ProfileService } from '@user/services/profile.service';

import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatMiniFabButton,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    MatButton,
    MatError,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  loading = signal(false);

  userInformationForm = this.formBuilder.group({
    email: this.formBuilder.control('', [
      Validators.required,
      emailValidator(),
    ]),
    name: this.formBuilder.control('', [Validators.required]),
  });

  editMode = signal({
    email: false,
    name: false,
  });

  userRole = this.profileService.userRole;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private formBuilder: NonNullableFormBuilder,
    private matDialog: MatDialog,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.getUserInformation();
  }

  get invalidEmail(): boolean {
    return this.userInformationForm.controls.email.errors?.invalidEmail;
  }

  get emptyEmail(): boolean {
    return this.userInformationForm.controls.email.errors?.required;
  }

  get invalidName(): boolean {
    return this.userInformationForm.controls.name.errors?.required;
  }

  toggleEditMode(field: 'name' | 'email'): void {
    this.editMode()[field] = !this.editMode()[field];
  }

  onSubmit(): void {
    this.editMode.set({ email: false, name: false });
    this.updateUserInformation();
  }

  logout(): void {
    this.authService.logout();
    this.profileService.userRole.set('user');
    this.router.navigate([RoutePath.Search]);
  }

  openDialog(): void {
    this.matDialog.open(ChangePasswordComponent);
  }

  private getUserInformation(): void {
    this.setLoading(true);

    this.profileService
      .getUserInformation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.userInformationForm.setValue({
            name: response.name ?? 'John Doe',
            email: response.email,
          });
        },
        error: () => {
          this.setLoading(false);
        },
        complete: () => {
          this.setLoading(false);
        },
      });
  }

  private updateUserInformation(): void {
    this.setLoading(true);
    const userInfo = this.userInformationForm.getRawValue();

    this.profileService
      .updateUserInformation(userInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => {
          this.setLoading(false);
        },
        complete: () => {
          this.setLoading(false);
        },
      });
  }

  private setLoading(loading: boolean): void {
    this.loading.set(loading);
  }
}
