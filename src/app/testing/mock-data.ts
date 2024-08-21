import {
  Credentials,
  Password,
  UserInfo,
  UserRole,
} from '@auth/models/auth.model';

export const mockCredentials: Credentials = {
  email: 'test@test.com',
  password: 'password',
};

export const mockUser: UserInfo = {
  name: 'John Doe',
  email: 'john@example.com',
};

export const mockUserWithRole: UserRole = {
  email: 'john@example.com',
  name: 'John Doe',
  role: 'manager',
};

export const mockPassword: Password = { password: 'newPassword123' };

export const mock500Error = { status: 500, statusText: 'Server Error' };
export const mock400Error = { status: 400, statusText: 'Bad Request' };
export const mock403Error = { status: 403, statusText: 'Forbidden' };
