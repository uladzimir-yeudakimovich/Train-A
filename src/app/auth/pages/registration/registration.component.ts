import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { emailValidator } from '@auth/validators/email.validator';
import { trimmedLengthValidator } from '@auth/validators/password.validator';
import { RoutePath } from '@shared/models/enums/route-path.enum';

import { formImports } from '../form.config';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [formImports],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  linkLogin = RoutePath.Login;

  registrationForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        emailValidator(),
      ]),
      password: new FormControl('', [
        Validators.required,
        trimmedLengthValidator(8, 225),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        trimmedLengthValidator(8, 225),
      ]),
    },
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  ) {}

  onRegistration(): void {
    const emailControl = this.registrationForm.get('email');
    emailControl?.addValidators(emailValidator()); // AC3
    emailControl?.updateValueAndValidity();

    if (this.registrationForm.valid) {
      const { email, password, confirmPassword } = this.registrationForm.value;
      if (password === confirmPassword) {
        this.authService
        .registration({ email, password })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          () => this.router.navigate([RoutePath.Login]),
          (err) => {
            emailControl?.setErrors({ alreadyExists: err.message });
            this.cdr.detectChanges();
          },
        );
      } else {
        const confirmPasswordControl = this.registrationForm.get('confirmPassword');
        const error = { confirmedValidator: 'Passwords do not match' };
        confirmPasswordControl!.setErrors(error);
      }
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.registrationForm.get('email');
    if (emailControl!.hasError('required')) {
      return 'Please enter an email';
    }
    if (emailControl!.hasError('invalidEmail')) {
      return 'Incorrect email';
    }
    if (emailControl!.hasError('email')) {
      return 'The email is invalid';
    }
    if (emailControl!.hasError('alreadyExists')) {
      return 'Account with this email already exists';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.registrationForm.get('password');
    if (passwordControl!.hasError('required')) {
      return 'Please enter a password';
    }
    if (passwordControl!.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmControl = this.registrationForm.get('confirmPassword');
    if (confirmControl!.hasError('confirmedValidator')) {
      return 'Passwords do not match';
    }
    return '';
  }
}
