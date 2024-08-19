import { HTTP_INTERCEPTORS } from '@angular/common/http';
<<<<<<< HEAD
import { ApiInterceptor } from '@core/interceptors/api-interceptor';
import { TokenInterceptor } from '@core/interceptors/token-interceptor';
=======

import { ApiInterceptor } from './api-interceptor';
import { TokenInterceptor } from './token-interceptor';
>>>>>>> 696896e (chore: run prettier)

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
