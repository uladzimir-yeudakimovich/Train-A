import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carriage } from '@shared/models/interfaces/carriage.model';
import { TrainCarService } from '@shared/services/train-car/train-car.service';

import { TrainCarComponent } from './train-car.component';

xdescribe('TrainCarComponent', () => {
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
          },
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrainCarComponent);
    component = fixture.componentInstance;

    component['trainCarService'] = TestBed.inject(TrainCarService);
    fixture.componentRef.setInput('carriage', {} as Carriage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
