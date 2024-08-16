import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ProfileService } from '../../services';

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
    password: this.formBuilder.control(''),
  });

  public onSubmit(): void {
    this.profileService.updateUserPassword(this.passwordForm.getRawValue()).subscribe();
  }
}
