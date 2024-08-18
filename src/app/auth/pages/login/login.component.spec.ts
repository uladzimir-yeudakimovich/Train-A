import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { authServiceMock, routerMock } from '@testing/mock-data';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { formImports } from '../form.config';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [formImports, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page on successful login', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    authServiceMock.login.mockReturnValue(of({}));

    component.onSubmit();
    fixture.detectChanges();

    expect(routerMock.navigate).toHaveBeenCalledWith([RoutePath.Search]);
  });
});
