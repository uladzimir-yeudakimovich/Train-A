import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormInterface } from '../models/login-form.interface';
import { LoginTokenInterface } from '../models/login-token.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  login(body: LoginFormInterface) {
    return this.http.post<LoginTokenInterface>('/api/signin', body);
  }
}
