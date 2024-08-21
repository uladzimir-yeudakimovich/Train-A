import { isDevMode } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DevLoggerService } from './dev-logger.service';
import { LoggerProvider } from './logger.provider';
import { LoggerService } from './logger.service';
import { ProdLoggerService } from './prod-logger.service';

jest.mock('@angular/core', () => ({
  ...jest.requireActual('@angular/core'),
  isDevMode: jest.fn(),
}));

describe('loggerServiceFactory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return DevLoggerService in development mode', () => {
    (isDevMode as jest.Mock).mockReturnValue(true);

    TestBed.configureTestingModule({
      providers: [LoggerProvider],
    });

    const service = TestBed.inject(LoggerService);
    expect(service).toBeInstanceOf(DevLoggerService);
  });

  it('should return ProdLoggerService in production mode', () => {
    (isDevMode as jest.Mock).mockReturnValue(false);
    TestBed.configureTestingModule({
      providers: [LoggerProvider],
    });

    const service = TestBed.inject(LoggerService);
    expect(service).toBeInstanceOf(ProdLoggerService);
  });
});
