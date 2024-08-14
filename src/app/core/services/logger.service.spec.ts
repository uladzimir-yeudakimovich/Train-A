import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { DevLoggerService } from './dev-logger.service';

describe('ConcreteLoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LoggerService, useClass: DevLoggerService }],
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log the message when logMessage is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const message = 'Test message';
    
    service.logMessage(message);
    
    expect(consoleSpy).toHaveBeenCalledWith(`[DEV]: ${message}`);
  });
});
