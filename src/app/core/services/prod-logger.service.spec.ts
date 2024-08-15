import { TestBed } from '@angular/core/testing';
import { ProdLoggerService } from './prod-logger.service';

describe('ProdLoggerService', () => {
  let service: ProdLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdLoggerService],
    });
    service = TestBed.inject(ProdLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log a message with the [PROD] prefix when logMessage is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const message = 'Test message';

    service.logMessage(message);

    expect(consoleSpy).toHaveBeenCalledWith(`[PROD]: ${message}`);
  });
});
