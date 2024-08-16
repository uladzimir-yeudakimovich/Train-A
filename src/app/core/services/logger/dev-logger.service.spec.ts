import { TestBed } from '@angular/core/testing';
import { DevLoggerService } from './dev-logger.service';

describe('DevLoggerService', () => {
  let service: DevLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevLoggerService],
    });
    service = TestBed.inject(DevLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log a message with the [DEV] prefix when logMessage is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const message = 'Test message';

    service.logMessage(message);

    expect(consoleSpy).toHaveBeenCalledWith(`[DEV]: ${message}`);
  });
});
