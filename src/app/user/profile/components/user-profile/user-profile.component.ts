import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/models/enums/route-path.enum';
import { UserProfileResponse } from '../../interfaces';
import { ProfileService } from '../../services';
import { emailValidator } from '../../validators';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';

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
  constructor(
    private readonly router: Router,
    private readonly profileService: ProfileService,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly matDialog: MatDialog,
    private readonly destroyRef: DestroyRef,
  ) {}

  public readonly userInformationForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, emailValidator()]),
    name: this.formBuilder.control('', [Validators.required]),
  });

  public readonly editMode = signal({
    email: false,
    name: false,
  });

  public readonly userRole = signal<UserProfileResponse['role']>('user');

  public readonly loading = signal(false);

  public get invalidEmail(): boolean {
    return this.userInformationForm.controls.email.errors?.['invalidEmail'];
  }

  public get emptyEmail(): boolean {
    return this.userInformationForm.controls.email.errors?.['required'];
  }

  public get invalidName(): boolean {
    return this.userInformationForm.controls.name.errors?.['required'];
  }

  public toggleEditMode(field: 'name' | 'email'): void {
    this.editMode()[field] = !this.editMode()[field];
  }

  public ngOnInit(): void {
    this.getUserInformation();
  }

  public onSubmit(): void {
    this.editMode.set({ email: false, name: false });
    this.updateUserInformation();
  }

  private getUserInformation(): void {
    this.showSpinner();

    this.profileService
      .getUserInformation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ name, email, role }) => {
          this.userInformationForm.setValue({ name, email });
          this.userRole.set(role);
        },
        error: () => {
          this.hideSpinner();
        },
        complete: () => {
          this.hideSpinner();
        },
      });
  }

  private updateUserInformation(): void {
    this.showSpinner();

    this.profileService
      .updateUserInformation(this.userInformationForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: () => {
          this.hideSpinner();
        },
        complete: () => {
          this.hideSpinner();
        },
      });
  }

  public logout(): void {
    this.profileService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigate([RoutePath.Search]);
        },
      });
  }

  private showSpinner(): void {
    this.loading.set(true);
  }

  private hideSpinner(): void {
    this.loading.set(false);
  }

  public openDialog(): void {
    this.matDialog.open(ChangePasswordFormComponent);
  }
}
