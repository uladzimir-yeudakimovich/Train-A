import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ProfileService } from '@user/services/profile.service';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogClose,
    MatMiniFabButton,
    MatError,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: NonNullableFormBuilder,
    private destroyRef: DestroyRef,
  ) {}

  passwordForm = this.formBuilder.group({
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
  });

  get shortPassword(): boolean {
    return this.passwordForm.controls.password.errors?.['minlength'];
  }

  get emptyPassword(): boolean {
    return this.passwordForm.controls.password.errors?.['required'];
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.profileService.updateUserPassword(this.passwordForm.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }
}
