import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProfileService } from '@user/services/profile.service';
import { profileServiceMock } from '@testing/index';
import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let profileService: ProfileService;

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
      providers: [{ provide: ProfileService, useValue: profileServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty password', () => {
    expect(component.passwordForm.controls.password.value).toBe('');
  });

  it('should return true for emptyPassword if password is not entered', () => {
    component.passwordForm.controls.password.setValue('');
    expect(component.emptyPassword).toBe(true);
  });

  it('should return true for shortPassword if password is less than 8 characters', () => {
    const passwordControl = component.passwordForm.controls.password;
    passwordControl.setValue('short');
    expect(component.shortPassword).toBeTruthy();
  });

  it('should mark password as invalid if too short', () => {
    const passwordControl = component.passwordForm.controls.password;
    passwordControl.setValue('short');
    expect(component.shortPassword).toBeTruthy();
  });

  it('should call profileService.updateUserPassword on valid form submission', () => {
    const passwordControl = component.passwordForm.controls.password;
    passwordControl.setValue('validPassword123');
    component.onSubmit();

    expect(profileService.updateUserPassword).toHaveBeenCalledWith({ password: 'validPassword123' });
  });

  it('should not call profileService.updateUserPassword on invalid form submission', () => {
    const passwordControl = component.passwordForm.controls.password;
    passwordControl.setValue('');
    component.onSubmit();

    expect(profileService.updateUserPassword).not.toHaveBeenCalled();
  });
});
