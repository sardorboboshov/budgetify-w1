import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main/services/main.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user_name: string = 'username';
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.setUser();
  }
  setUser() {
    const user_id = localStorage.getItem('userId');
    this.mainService.getData(Number(user_id)).subscribe((data: any) => {
      this.user_name = data.user[0].user_name;
    });
  }
}
