import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
 
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      const jwt = this.authService.getToken();
      const cloned = request.clone({
        headers: request.headers.set('Authorization', String(jwt))
      });
      return next.handle(cloned).pipe(
        catchError((response: HttpErrorResponse) => {
          if (response.status === 401) {
            this.router.navigate(['/login']);

          }
          return throwError(response);
        })
      );
    }
    return next.handle(request);
  }
}
