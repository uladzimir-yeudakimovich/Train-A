import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import {
  authServiceMock, matDialogMock, profileServiceMock, routerMock,
} from '@testing/index';
import { ProfileService } from '@user/services/profile.service';

import { UserProfileComponent } from './user-profile.component';

import { ChangePasswordComponent } from '../change-password/change-password.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let profileService: ProfileService;
  let authService: AuthService;
  let router: Router;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ProfileService, useValue: profileServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        ChangeDetectorRef,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    matDialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user information', () => {
    component.ngOnInit();
    expect(component.userInformationForm.controls.name.value).toBe('John Doe');
    expect(component.userInformationForm.controls.email.value).toBe('john.doe@example.com');
  });

  it('should return true for invalidEmail if email is invalid', () => {
    component.userInformationForm.controls.email.setErrors({ invalidEmail: true });
    expect(component.invalidEmail).toBe(true);
  });

  it('should toggle edit mode for email', () => {
    component.toggleEditMode('email');
    expect(component.editMode().email).toBe(true);

    component.toggleEditMode('email');
    expect(component.editMode().email).toBe(false);
  });

  it('should submit the form and call updateUserInformation', () => {
    const spy = jest.spyOn(component as unknown as { updateUserInformation: () => void }, 'updateUserInformation');
    component.onSubmit();

    expect(component.editMode().email).toBe(false);
    expect(component.editMode().name).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it('should log out the user and navigate to the search page', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(profileService.userRole.set).toHaveBeenCalledWith('user');
    expect(router.navigate).toHaveBeenCalledWith([RoutePath.Search]);
  });

  it('should open the change password dialog', () => {
    component.openDialog();
    expect(matDialog.open).toHaveBeenCalledWith(ChangePasswordComponent);
  });

  it('should set loading state correctly', () => {
    component.setLoading(true);
    expect(component.loading()).toBe(true);

    component.setLoading(false);
    expect(component.loading()).toBe(false);
  });

  it('should call getUserInformation on init', () => {
    const spy = jest.spyOn(component as unknown as { getUserInformation: () => void }, 'getUserInformation');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
