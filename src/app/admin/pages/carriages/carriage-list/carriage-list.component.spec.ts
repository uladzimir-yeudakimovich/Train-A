import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { mockCarriageStore } from '@testing/mock-store';

import { CarriageListComponent } from './carriage-list.component';
// import { carriagesMock, carriagesSignalMock } from '@testing/mock-data';

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

  // it('should set carriages input correctly', () => {
  //   component.carriages = carriagesSignalMock;
  //   expect(component.carriages()).toEqual(carriagesMock);
  // });

  it('should call getCarriageSignal with correct code', () => {
    const code = 'carriage1';
    component.getCarriage(code);
    expect(mockCarriageStore.getCarriageSignal).toHaveBeenCalledWith(code);
  });

  it('should return the correct carriage signal from getCarriage', () => {
    const code = 'carriage2';
    const carriageSignal = component.getCarriage(code);
    expect(carriageSignal).toBe(mockCarriageStore.getCarriageSignal(code));
  });
});
