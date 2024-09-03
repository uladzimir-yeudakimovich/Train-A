import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { authServiceMock, routerMock } from '@testing/index';

import { RegistrationComponent } from './registration.component';

import { formImports } from '../form.config';

xdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [formImports, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid registration form initially', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should show error message when email is invalid', () => {
    const emailControl = component.registrationForm.controls.email;
    emailControl.setValue('invalid-email');
    expect(component.getEmailErrorMessage()).toBe('The email is invalid');
  });

  it('should show error message when password is too short', () => {
    const passwordControl = component.registrationForm.controls.password;
    passwordControl.setValue('short');
    expect(component.getPasswordErrorMessage()).toBe('Password must be at least 8 characters long');
  });

  it('should show error message when passwords do not match', () => {
    component.registrationForm.controls.password.setValue('password123');
    component.registrationForm.controls.confirmPassword.setValue('password456');
    expect(component.getConfirmPasswordErrorMessage()).toBe('Passwords do not match');
  });
});
