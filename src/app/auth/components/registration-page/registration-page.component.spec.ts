import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { RegistrationPageComponent } from './registration-page.component';
import { AuthService } from '../../services/auth.service';
import { authServiceMock, routerMock } from '@testing/mock-data';
import { RoutePath } from '@shared/models/enums/route-path.enum';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        ChangeDetectorRef
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
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
