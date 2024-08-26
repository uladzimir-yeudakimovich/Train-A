import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Carriage } from '@shared/models/interfaces/carriage.model';

import { CarriageFormComponent } from './carriage-form.component';

describe('CarriageFormComponent', () => {
  let component: CarriageFormComponent;
  let fixture: ComponentFixture<CarriageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CarriageFormComponent, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formGroup = component.carriageForm;
    expect(formGroup.value).toEqual({
      name: '',
      rows: 0,
      leftSeats: 0,
      rightSeats: 0,
    });
  });

  it('should populate the form when carriage input is provided', () => {
    const mockCarriage: Carriage = {
      code: 'ABC123',
      name: 'First Carriage',
      rows: 10,
      leftSeats: 5,
      rightSeats: 5,
      seats: [],
    };
    component.carriage = mockCarriage;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.carriageForm.value).toEqual({
      name: 'First Carriage',
      rows: 10,
      leftSeats: 5,
      rightSeats: 5,
    });
  });

  it('should not emit any event if the form is invalid', () => {
    jest.spyOn(component.addCarriage, 'emit');
    jest.spyOn(component.updateCarriage, 'emit');

    component.carriageForm.setValue({
      name: '',
      rows: 0,
      leftSeats: 0,
      rightSeats: 0,
    });

    component.onSave();

    expect(component.addCarriage.emit).not.toHaveBeenCalled();
    expect(component.updateCarriage.emit).not.toHaveBeenCalled();
  });

  it('should emit closeForm event on close', () => {
    jest.spyOn(component.closeForm, 'emit');

    component.onClose();

    expect(component.closeForm.emit).toHaveBeenCalled();
  });
});
