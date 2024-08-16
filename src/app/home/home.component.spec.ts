import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoggerService } from '../core/services/logger.service';
import { HeaderComponent } from '../core/components/header/header.component';
import { activatedRouteMock } from '../testing/mock-data';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HeaderComponent,
          RouterOutlet,
          HomeComponent,
        ],
        providers: [
          { provide: LoggerService },
          { provide: ActivatedRoute, useValue: activatedRouteMock },
        ],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onUserLogin on ngOnInit', () => {
    const onUserLoginSpy = jest.spyOn(component, 'onUserLogin');
    component.ngOnInit();
    expect(onUserLoginSpy).toHaveBeenCalled();
  });
});
