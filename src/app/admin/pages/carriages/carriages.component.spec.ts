import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarriageStore } from '@shared/store/carriages/carriages.store';
import { mockCarriageStore } from '@testing/index';

import { CarriagesComponent } from './carriages.component';

describe('CarriagesComponent', () => {
  let component: CarriagesComponent;
  let fixture: ComponentFixture<CarriagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriagesComponent],
      providers: [
        { provide: CarriageStore, useValue: mockCarriageStore },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarriagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCarriages on ngOnInit', () => {
    component.ngOnInit();
    expect(mockCarriageStore.getCarriages).toHaveBeenCalled();
  });

  it('should set carriages from CarriageStore on ngOnInit', () => {
    component.ngOnInit();
    expect(component.carriages).toBe(mockCarriageStore.carriagesEntities);
  });

  it('should toggle formVisible when isShowForm is called', () => {
    const initialValue = component.formVisible();
    component.isShowForm();
    expect(component.formVisible()).toBe(!initialValue);

    component.isShowForm();
    expect(component.formVisible()).toBe(initialValue);
  });
});
