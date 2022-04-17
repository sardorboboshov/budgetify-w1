import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService Test', () => {
  const { loginUrl } = environment;

  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('Auth Service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Login', () => {
    it('should return a user data', (done: DoneFn) => {
      const mockResponse = {
        id: 'id',
        email: 'email',
        role: 'role',
        token: 'token'
      };
      service.login('test@gmail.com', '123').subscribe({
        next: (res) => {
          expect(res).toEqual(mockResponse);
          done();
        }
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: loginUrl
      });
      req.flush(mockResponse);
    });
    it('setSession has to been called on success', (done: DoneFn) => {
      spyOn(service as any, 'setSession');
      const expectedResult = {
        id: 'id',
        email: 'email',
        role: 'role',
        token: 'token'
      };
      service.login('test@gmail.com', '123').subscribe(() => {
        expect((service as any).setSession).toHaveBeenCalledOnceWith(
          expectedResult
        );
        done();
      });
      const req = httpController.expectOne({
        method: 'POST',
        url: loginUrl
      });
      req.flush(expectedResult);
    });
    it('setSession has not been called on error', (done: DoneFn) => {
      spyOn(service as any, 'setSession');
      service.login('wrongEmail@gmail.com', 'wrongPsw').subscribe({
        error: (e) => {
          expect((service as any).setSession).not.toHaveBeenCalled();
          done();
        }
      });

      const req = httpController.expectOne({
        method: 'POST',
        url: loginUrl
      });
      req.error(new ProgressEvent('401'));
    });
  });
});
