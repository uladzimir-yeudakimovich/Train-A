import { of } from 'rxjs';

export const routerMock = {
  navigate: jest.fn(),
};

export const activatedRouteMock = {
  snapshot: {
    paramMap: { get: jest.fn() },
  },
};

export const authServiceMock = {
  isLogin: { set: jest.fn() },
  registration: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};

export const profileServiceMock = {
  userRole: { set: jest.fn() },
  getUserInformation: jest
    .fn()
    .mockReturnValue(of({ name: 'John Doe', email: 'john.doe@example.com' })),
  updateUserInformation: jest.fn().mockReturnValue(of({})),
  updateUserPassword: jest.fn().mockReturnValue(of({})),
};

export const matDialogMock = {
  open: jest.fn(),
};

export const loggerServiceMock = {
  logMessage: jest.fn(),
};
