import { TestBed } from '@angular/core/testing';

import { TrainCarService } from './train-car.service';

describe('TrainCarService', () => {
  let service: TrainCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
