import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { authServiceMock, profileServiceMock } from '@testing/mock-service';
import { ProfileService } from '@user/services/profile.service';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, HttpClientModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ProfileService, useValue: profileServiceMock },
      ],
<<<<<<< HEAD
    })
      .compileComponents();
=======
    }).compileComponents();
>>>>>>> 696896e (chore: run prettier)

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
