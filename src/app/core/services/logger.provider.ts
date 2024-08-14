import { isDevMode } from '@angular/core';
import { LoggerService } from './logger.service';
import { DevLoggerService } from './dev-logger.service';
import { ProdLoggerService } from './prod-logger.service';

export const loggerServiceFactory = (): LoggerService => {
  if (isDevMode()) {
    return new DevLoggerService();
  } else {
    return new ProdLoggerService();
  }
};

export const LoggerProvider = {
  provide: LoggerService,
  useFactory: loggerServiceFactory,
};
