import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '@core/interceptors/api-interceptor';
import { TokenInterceptor } from '@core/interceptors/token-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
