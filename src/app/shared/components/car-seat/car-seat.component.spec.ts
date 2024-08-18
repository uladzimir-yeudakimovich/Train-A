import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSeatComponent } from './car-seat.component';

describe('CarSeatComponent', () => {
  let component: CarSeatComponent;
  let fixture: ComponentFixture<CarSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSeatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
