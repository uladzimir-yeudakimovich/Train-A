import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarSeat } from '@shared/models/interfaces/carriage.model';

import { CarSeatComponent } from './car-seat.component';

describe('CarSeatComponent', () => {
  let component: CarSeatComponent;
  let fixture: ComponentFixture<CarSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSeatComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarSeatComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('seat', { number: 1, state: SeatState.Reserved } as CarSeat);
    fixture.componentRef.setInput('direction', 'left');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
