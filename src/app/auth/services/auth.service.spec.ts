import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { mockCredentials } from '@testing/index';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: { navigate: jest.Mock };

  beforeEach(() => {
    routerSpy = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to the correct URL when registration is called', () => {
    service.registration(mockCredentials).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush({});
  });

  it('should handle successful registration response correctly', () => {
    service.registration(mockCredentials).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush({});
  });

  it('should handle registration error response correctly', () => {
    const errorMessage = 'Registration failed';

    service.registration(mockCredentials).subscribe(
      () => fail('Expected an error, but got a success response'),
      (error) => {
        expect(error.status).toBe(400);
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne('signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });

  it('should navigate to login page after successful registration', () => {
    service.registration(mockCredentials).subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    const req = httpMock.expectOne('signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush({});
  });
});
