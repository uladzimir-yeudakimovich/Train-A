import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
<<<<<<< HEAD
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
=======
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
>>>>>>> 696896e (chore: run prettier)
    if (req.headers.get('SkipAuthorization') === 'true') {
      const cleanReq = req.clone({
        headers: req.headers.delete('SkipAuthorization'),
      });
      return next.handle(cleanReq);
    }

    const token = localStorage.getItem('token');

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authReq);
  }
}
