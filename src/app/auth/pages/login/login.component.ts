import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '@auth/validators/email.validator';
import { passwordValidator } from '@auth/validators/password.validator';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatAnchor } from '@angular/material/button';
import { LoginCredentials } from '@auth/models/auth.model';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatLabel,
    MatButton,
    MatAnchor,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  public readonly loginForm = this.formBuilder.nonNullable.group(
    {
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    },
    { updateOn: 'blur' },
  );

  get email(): FormControl<string> {
    return this.loginForm.controls['email'];
  }

  get emailErrorMessage(): string | null {
    if (this.email.errors?.['required']) {
      return 'Required';
    }

    if (this.email.errors?.['invalidEmail']) {
      return 'Incorrect email';
    }

    if (this.email.errors?.['errorResponse']) {
      return 'Incorrect email or password';
    }

    return null;
  }

  get password(): FormControl<string> {
    return this.loginForm.controls['password'];
  }

  get passwordErrorMessage(): string | null {
    if (this.password.errors?.['required']) {
      return 'Required';
    }

    if (this.password.errors?.['invalidPassword']) {
      return 'Not less 8 symbols';
    }

    if (this.password.errors?.['errorResponse']) {
      return 'Incorrect email or password';
    }

    return null;
  }

  onSubmit(): void {
    const body = this.loginForm.value as LoginCredentials;

    this.authService.login(body).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        this.router.navigate([RoutePath.Search]);
      },
      error: () => {
        this.email.setErrors({ errorResponse: true });
        this.password.setErrors({ errorResponse: true });
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
