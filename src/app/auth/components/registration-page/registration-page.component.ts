import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  linkLogin = RoutePath.Login;
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ])},
    { validators: this.matchValidator('password', 'confirmPassword') },
  );
  private destroyRef = inject(DestroyRef);

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  onRegistration(): void {
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      this.authService.registration({ email, password}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
        () => this.router.navigate([RoutePath.Login]),
        err => {
          const emailControl = this.registrationForm.get('email');
          emailControl?.setErrors({ alreadyExists: err.message });
          this.cdr.detectChanges();
        }
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
    }
  }
}
