import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProfileService } from '../../services';
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
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);

  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly destroyRef = inject(DestroyRef);

  private readonly matDialog = inject(MatDialog);

  public readonly userInformationForm = this.formBuilder.group({
    email: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
  });

  public readonly editMode = signal({
    email: false,
    name: false,
  });

  public readonly loading = signal(false);

  public toggleEditMode(field: 'name' | 'email'): void {
    if (field === 'name') {
      this.editMode.update((value) => ({ ...value, name: !value.name }));
    }

    if (field === 'email') {
      this.editMode.update((value) => ({ ...value, email: !value.email }));
    }
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
        next: ({ name, email }) => {
          this.userInformationForm.setValue({ name, email });
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

  private showSpinner(): void {
    this.loading.set(true);
  }

  private hideSpinner(): void {
    this.loading.set(false);
  }

  public openDialog(): void {
    this.matDialog.open(ChangePasswordFormComponent, {});
  }
}
