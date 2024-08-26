import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';

xdescribe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
