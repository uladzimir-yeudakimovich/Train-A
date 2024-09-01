import { signal } from '@angular/core';
import {
  Credentials,
  Password,
  UserInfo,
  UserRole,
} from '@auth/models/auth.model';
import { SeatState } from '@shared/models/enums/seat-state.enum';
import { Carriage } from '@shared/models/interfaces/carriage.model';

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

export const carriagesMock: Carriage[] = [
  {
    code: 'C1',
    name: 'First Class',
    rows: 10,
    leftSeats: 2,
    rightSeats: 2,
    seats: [
      { number: 1, state: SeatState.Available },
      { number: 2, state: SeatState.Available },
    ],
  },
  {
    code: 'C2',
    name: 'Second Class',
    rows: 20,
    leftSeats: 3,
    rightSeats: 3,
    seats: [
      { number: 3, state: SeatState.Selected },
      { number: 4, state: SeatState.Reserved },
    ],
  },
] as Carriage[];

export const carriagesSignalMock = signal<Carriage[]>(carriagesMock);
