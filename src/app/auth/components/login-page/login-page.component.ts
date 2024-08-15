import { Component, inject } from '@angular/core';
import { loginPageImports } from './login-page.config';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { loginEmailValidator } from '../../validators/login-email.validator';
import { loginPasswordValidator } from '../../validators/login-password.validator';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [loginPageImports],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);

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

  get isRequiredEmail(): ValidationErrors | null {
    return this.email.errors?.['required'];
  }

  get isInvalidEmail(): ValidationErrors | null {
    return this.email.errors?.['invalidEmail'];
  }

  get password(): FormControl<string> {
    return this.loginForm.controls['password'];
  }

  get isRequiredPassword(): ValidationErrors | null {
    return this.password.errors?.['required'];
  }

  get isInvalidPassword(): ValidationErrors | null {
    return this.password.errors?.['invalidPassword'];
  }
}
