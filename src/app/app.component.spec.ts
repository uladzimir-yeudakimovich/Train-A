import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HomeComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render home component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const homeComponentElement = fixture.debugElement.query(By.directive(HomeComponent));
    expect(homeComponentElement).toBeTruthy();
  });
});
