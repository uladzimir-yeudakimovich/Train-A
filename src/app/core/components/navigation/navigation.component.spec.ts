import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { authServiceMock, profileServiceMock } from '@testing/mock-service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';
import { ProfileService } from '@user/services/profile.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authService: jest.Mocked<AuthService>;
  let profileService: jest.Mocked<ProfileService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        HttpClientModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ProfileService, useValue: profileServiceMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    profileService = TestBed.inject(ProfileService) as jest.Mocked<ProfileService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
