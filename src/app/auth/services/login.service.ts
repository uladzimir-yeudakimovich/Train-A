import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutePath } from '@shared/models/enums/route-path.enum';
import { LoginFormInterface } from '@auth/models/login-form.interface';
import { LoginTokenInterface } from '@auth/models/login-token.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  login(body: LoginFormInterface) {
    return this.http.post<LoginTokenInterface>(`/api/${RoutePath.Login}`, body);
  }
}
