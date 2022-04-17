import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main/services/main.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName$!: Observable<Object>;
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.setUser();
  }
  setUser() {
    const userId = localStorage.getItem('userId');
    this.mainService
      .getAccountName(Number(userId))
      .pipe((res) => (this.userName$ = res));
  }
}
