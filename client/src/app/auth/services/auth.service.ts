import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = environment.loginUrl;
  userUrl = environment.userUrl;
  userData = {};
  constructor(private http: HttpClient, private router: Router) {}

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
    const userId = localStorage.getItem('userId');
    return token ? true : false;
  }

  logout() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
  }

  private setSession(res: any) {
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('userId', res.id);
  }

  getData() {
    let data;
    this.http.get(`${this.userUrl}/0`).subscribe((response) => {
      data = response;
    });
    if (!data) {
      localStorage.removeItem('idToken');
      this.router.createUrlTree(['login']);
    }
  }
}
