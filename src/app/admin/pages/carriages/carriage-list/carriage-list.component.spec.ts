import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { mockCarriageStore } from '@testing/mock-store';

import { CarriageListComponent } from './carriage-list.component';

describe('CarriageListComponent', () => {
  let component: CarriageListComponent;
  let fixture: ComponentFixture<CarriageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageListComponent],
      providers: [
        { provide: CarriageStore, useValue: mockCarriageStore },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarriageListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
