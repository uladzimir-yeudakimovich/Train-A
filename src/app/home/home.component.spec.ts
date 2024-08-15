import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LoggerService } from '../core/services/logger.service';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: LoggerService }],
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
