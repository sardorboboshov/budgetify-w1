import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { filter, tap, throttleTime } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private throttleLogout = new Subject();
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    this.throttleLogout.subscribe(() => {
      this.authService.logout();
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    if (this.authService.isLoggedIn()) {
      const jwt = this.authService.getToken();
      request = request.clone({
        headers: request.headers.set('Authorization', String(jwt))
      });
    }
    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.logout();
          }
          this.spinnerService.hideSpinner();
          return throwError(() => err);
        })
      )
      .pipe(
        filter((event: any) => event instanceof HttpResponse),
        tap(() => this.spinnerService.hideSpinner())
      );
  }
}
