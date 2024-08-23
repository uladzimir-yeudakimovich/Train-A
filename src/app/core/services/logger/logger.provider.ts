import { isDevMode } from '@angular/core';

import { DevLoggerService } from './dev-logger.service';
import { LoggerService } from './logger.service';
import { ProdLoggerService } from './prod-logger.service';

export const loggerServiceFactory = (): LoggerService => {
  if (isDevMode()) {
    return new DevLoggerService();
  }
  return new ProdLoggerService();
};

export const LoggerProvider = {
  provide: LoggerService,
  useFactory: loggerServiceFactory,
};
