import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    if (this.authService.isLoggedIn()) {
      const jwt = this.authService.getToken();
      const cloned = request.clone({
        headers: request.headers.set('Authorization', String(jwt))
      });
      return next.handle(cloned).pipe(
        filter((event: any) => event instanceof HttpResponse),
        tap(() => this.spinnerService.hideSpinner())
      );
    }
    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
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
