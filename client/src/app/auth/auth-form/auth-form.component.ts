import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnDestroy {
  private subscription!: Subscription;
  public isWrongCredentials: boolean = false;
  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.loginForm);
    const { email, password } = this.loginForm.value;
    this.subscription = this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['main']);
      },
      error: (e) => {
        this.isWrongCredentials = true;
        this.loginForm.markAsPristine();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  disabled() {
    console.log(this.loginForm.invalid, this.loginForm.dirty);
    return this.loginForm.invalid || !this.loginForm.dirty;
  }
}
