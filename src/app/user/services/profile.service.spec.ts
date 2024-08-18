import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { mockUser, mockUserWithRole, mockPassword, mock500Error, mock400Error, mock403Error } from '@testing/mock-data';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user information and update userRole signal', () => {
    service.getUserInformation().subscribe((res) => {
      expect(res).toEqual(mockUserWithRole);
      expect(service.userRole()).toBe('manager');
    });

    const req = httpMock.expectOne('profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserWithRole);
  });

  it('should update user information', () => {
    const mockResponse = {};

    service.updateUserInformation(mockUser).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('profile');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });

  it('should update user password', () => {
    const mockResponse = {};

    service.updateUserPassword(mockPassword).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('profile/password');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockPassword);
    req.flush(mockResponse);
  });

  it('should handle error when fetching user information', () => {
    service.getUserInformation().subscribe({
      next: () => fail('Expected an error, not user information'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('profile');
    req.flush('Something went wrong', mock500Error);
  });

  it('should handle error when updating user information', () => {
    service.updateUserInformation(mockUser).subscribe({
      next: () => fail('Expected an error, not a success response'),
      error: (error) => {
        expect(error.status).toBe(400);
      },
    });

    const req = httpMock.expectOne('profile');
    req.flush('Invalid data', mock400Error);
  });

  it('should handle error when updating user password', () => {
    service.updateUserPassword(mockPassword).subscribe({
      next: () => fail('Expected an error, not a success response'),
      error: (error) => {
        expect(error.status).toBe(403);
      },
    });

    const req = httpMock.expectOne('profile/password');
    req.flush('Forbidden action', mock403Error);
  });
});
