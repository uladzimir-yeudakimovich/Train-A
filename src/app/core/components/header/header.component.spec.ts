import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoggerService } from '@core/services/logger/logger.service';
import { loggerServiceMock } from '@testing/index';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [{ provide: LoggerService, useValue: loggerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onUserLogin on init', () => {
    const spy = jest.spyOn(component, 'onUserLogin');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
