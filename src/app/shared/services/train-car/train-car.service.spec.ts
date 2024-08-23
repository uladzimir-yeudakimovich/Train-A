import { TestBed } from '@angular/core/testing';

import { TrainCarService } from './train-car.service';

xdescribe('TrainCarService', () => {
  let service: TrainCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainCarService],
    });
    service = TestBed.inject(TrainCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
