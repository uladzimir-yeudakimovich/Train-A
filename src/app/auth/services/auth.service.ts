import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials, RegistrationCredentials, TokenInterface } from '../models/auth.model';
import { RoutePath } from '@shared/models/enums/route-path.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registration(credentials: RegistrationCredentials): Observable<object> {
    return this.http.post<object>(RoutePath.Registration, credentials);
  }

  login(credentials: LoginCredentials): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(RoutePath.Login, credentials);
  }
}
