import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginPageImports } from './login-page.config';
import { loginEmailValidator } from '@auth/validators/login-email.validator';
import { loginPasswordValidator } from '@auth/validators/login-password.validator';
import { LoginService } from '@auth/services/login.service';
import { LoginFormInterface } from '@auth/models/login-form.interface';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [loginPageImports],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  public readonly loginForm = this.formBuilder.nonNullable.group(
    {
      email: ['', [Validators.required, loginEmailValidator()]],
      password: ['', [Validators.required, loginPasswordValidator()]],
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
    const body = this.loginForm.value as LoginFormInterface;

    this.loginService
      .login(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ token }) => {
          localStorage.setItem('token', token);
          this.router.navigate([RoutePath.Search]);
        },
        error: () => {
          this.email.setErrors({ errorResponse: true });
          this.password.setErrors({ errorResponse: true });
          this.changeDetectorRef.markForCheck();
        },
      });
  }
}
