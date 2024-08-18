import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { RegistrationComponent } from './registration.component';
import { AuthService } from '../../services/auth.service';
import { authServiceMock, routerMock } from '@testing/mock-data';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { formImports } from '../form.config';

describe('RegistrationComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on successful registration', () => {
    component.registrationForm.controls['email'].setValue('test@example.com');
    component.registrationForm.controls['password'].setValue('password123');
    component.registrationForm.controls['confirmPassword'].setValue('password123');

    authServiceMock.registration.mockReturnValue(of({}));

    component.onRegistration();
    fixture.detectChanges();

    expect(routerMock.navigate).toHaveBeenCalledWith([RoutePath.Login]);
  });
});
