import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.matchValidator('password', 'confirmPassword') },
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  ) {}

  onRegistration(): void {
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      this.authService
        .registration({ email, password })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          () => this.router.navigate([RoutePath.Search]),
          (err) => {
            const emailControl = this.registrationForm.get('email');
            emailControl?.setErrors({ alreadyExists: err.message });
            this.cdr.detectChanges();
          },
        );
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.registrationForm.get('email');
    if (emailControl!.hasError('required')) {
      return 'Please enter a email';
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
    if (confirmControl!.hasError('required')) {
      return 'Please confirm a password';
    }
    if (confirmControl!.hasError('confirmedValidator')) {
      return 'Passwords do not match';
    }
    return '';
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      } else if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }
}
