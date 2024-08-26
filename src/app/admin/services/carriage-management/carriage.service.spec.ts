import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiPath } from '@shared/models/enums/api-path.enum';
import { carriagesMock } from '@testing/mock-data';

import { CarriageService } from './carriage.service';

describe('CarriageService', () => {
  let service: CarriageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarriageService],
    });
    service = TestBed.inject(CarriageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a carriage successfully', async () => {
    const mockResponse = { success: true };

    service.addCarriage(carriagesMock[0]).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(ApiPath.Carriage);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle error when adding a carriage', async () => {
    const mockError = new ErrorEvent('Network error');

    service.addCarriage(carriagesMock[0]).catch((error) => {
      expect(error.error).toBe(mockError);
    });

    const req = httpMock.expectOne(ApiPath.Carriage);
    expect(req.request.method).toBe('POST');
    req.error(mockError);
  });

  it('should update a carriage successfully', async () => {
    const mockResponse = { success: true };

    service.updateCarriage(carriagesMock[0]).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${ApiPath.Carriage}/${carriagesMock[0].code}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should handle error when updating a carriage', async () => {
    const mockError = new ErrorEvent('Network error');

    service.updateCarriage(carriagesMock[0]).catch((error) => {
      expect(error.error).toBe(mockError);
    });

    const req = httpMock.expectOne(`${ApiPath.Carriage}/${carriagesMock[0].code}`);
    expect(req.request.method).toBe('PUT');
    req.error(mockError);
  });
});
