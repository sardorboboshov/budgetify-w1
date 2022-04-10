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
  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.subscription = this.authService
      .login(email, password)
      .subscribe(() => {
        this.router.navigate(['main']);
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
