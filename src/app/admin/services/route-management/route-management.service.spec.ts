import { TestBed } from '@angular/core/testing';

import { RouteManagementService } from './route-management.service';

describe('RouteManagementService', () => {
  let service: RouteManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
