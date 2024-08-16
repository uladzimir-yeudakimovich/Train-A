import { Component } from '@angular/core';
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
import { ProfileService } from '../../services';
import { passwordValidator } from '../../validators';

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
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss',
})
export class ChangePasswordFormComponent {
  constructor(
    private readonly profileService: ProfileService,
    private readonly formBuilder: NonNullableFormBuilder,
  ) {}

  public readonly passwordForm = this.formBuilder.group({
    password: this.formBuilder.control('', [Validators.required, passwordValidator()]),
  });

  public get invalidPassword(): boolean {
    return this.passwordForm.controls.password.errors?.['invalidPassword'];
  }

  public get emptyPassword(): boolean {
    return this.passwordForm.controls.password.errors?.['required'];
  }

  public onSubmit(): void {
    this.profileService.updateUserPassword(this.passwordForm.getRawValue()).subscribe();
  }
}
