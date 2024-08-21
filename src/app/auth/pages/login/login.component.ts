import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { emailValidator } from '@auth/validators/email.validator';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { ProfileService } from '@user/services/profile.service';

import { formImports } from '../form.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [formImports],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  linkRegistration = RoutePath.Registration;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private profileService: ProfileService,
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      emailValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl!.hasError('required')) {
      return 'Please enter a email';
    }
    if (emailControl!.hasError('email')) {
      return 'Incorrect email';
    }
    if (emailControl!.hasError('notExists')) {
      return 'Incorrect email or password';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl!.hasError('required')) {
      return 'Please enter a password';
    }
    if (passwordControl!.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (passwordControl!.hasError('notExists')) {
      return 'Incorrect email or password';
    }
    return '';
  }

  onSubmit(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.profileService
            .getUserInformation()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => this.router.navigate([RoutePath.Search]),
            });
        },
        error: () => {
          const emailControl = this.loginForm.get('email');
          emailControl?.setErrors({ notExists: true });
          const passwordControl = this.loginForm.get('password');
          passwordControl?.setErrors({ notExists: true });
          this.cdr.detectChanges();
        },
      });
  }
}
