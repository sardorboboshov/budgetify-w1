import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainService } from '../services/main.service';
import { IUser } from '../models/user.model';
import { IAccount } from '../models/account.model';
import { Observable, pipe } from 'rxjs';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @Output() accountIdx = new EventEmitter<number>();
  data!: IUser;
  accounts$: Observable<IAccount[]> = new Observable<[]>();
  selectedAccountIdx: number = 0;
  constructor(private mainService: MainService) {}
  ngOnInit() {
    this.accountIdx.emit(this.selectedAccountIdx);
    this.setAccount();
  }
  setAccount() {
    const user_id = localStorage.getItem('userId');
    this.mainService
      .getAllAccountsData(Number(user_id))
      .pipe((res) => (this.accounts$ = res));
  }
  setSelectedAccount(idx: number) {
    this.selectedAccountIdx = idx;
    this.accountIdx.emit(idx);
  }
}
