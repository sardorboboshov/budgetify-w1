import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = environment.loginUrl;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post(this.loginUrl, { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }

  getToken() {
    const token = localStorage.getItem('idToken');
    return token ? token : false;
  }

  isLoggedIn() {
    const token = localStorage.getItem('idToken');
    return token ? token : false;
  }

  logout() {
    localStorage.removeItem('idToken');
  }

  private setSession(res: any) {
    localStorage.setItem('idToken', res.token);
  }
}
