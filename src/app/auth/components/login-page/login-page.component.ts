import { LoginFormInterface } from './../../models/login-form.interface';
import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginPageImports } from './login-page.config';
import { loginEmailValidator } from '../../validators/login-email.validator';
import { loginPasswordValidator } from '../../validators/login-password.validator';
import { LoginService } from '../../services/login.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoutePath } from '../../../shared/models/enums/route-path.enum';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [loginPageImports],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);

  private readonly loginService = inject(LoginService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly router = inject(Router);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

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

  onSubmit() {
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
