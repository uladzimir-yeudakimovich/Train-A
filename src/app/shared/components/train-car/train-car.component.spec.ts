import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCarComponent } from './train-car.component';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { TrainCarService } from '@shared/services/train-car/train-car.service';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { CarriagesStore } from '@shared/store/carriages.store';

describe('TrainCarComponent', () => {
  let component: TrainCarComponent;
  let fixture: ComponentFixture<TrainCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainCarComponent],
      providers: [
        {
          provide: TrainCarService,
          useValue: {
            getSeatDirection: () => 'left',
            isLastInRow: () => false,
            isCorridor: () => false,
            getAvailableSeatsNumber: () => 15,
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainCarComponent);
    component = fixture.componentInstance;

    component['trainCarService'] = TestBed.inject(TrainCarService);
    fixture.componentRef.setInput('carriage', new Carriage('1', 'Carriage 1', 5, 2, 1));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
