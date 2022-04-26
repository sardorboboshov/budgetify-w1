import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main/services/main.service';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName$!: Observable<Object>;
  panelOpenState = false;
  constructor(
    private mainService: MainService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setUser();
  }
  setUser() {
    const userId = localStorage.getItem('userId');
    this.mainService
      .getAccountName(Number(userId))
      .pipe((res) => (this.userName$ = res));
  }
  logout() {
    this.authService.logout();
  }
}
