import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MainService } from '../services/main.service';
import { IUser } from '../models/user.model';
import { IAccount } from '../models/account.model';
import { AccountInformationsComponent } from './accounts-informations/account-informations.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @Output() accountIdx = new EventEmitter<number>();
  @Output() rerenderAccounts = new EventEmitter<() => void>();
  data!: IUser;
  accounts$: Observable<IAccount[]> = new Observable<[]>();
  selectedAccountIdx: number = 0;
  constructor(private mainService: MainService, private dialog: MatDialog) {}

  ngOnInit() {
    this.setAccount();
    this.rerenderAccounts.emit(this.rerenderAccountsFn.bind(this));
  }
  rerenderAccountsFn() {
    this.setAccount();
  }
  setAccount() {
    const user_id = localStorage.getItem('userId');
    this.accounts$ = this.mainService.getAllAccountsData(Number(user_id));
  }
  setSelectedAccount(idx: number) {
    if (this.selectedAccountIdx === idx) {
      this.openDialog();
    }
    this.selectedAccountIdx = idx;
    this.accountIdx.emit(idx);
  }

  setDefaultAccount() {
    this.setSelectedAccount(0);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35vw';
    dialogConfig.height = '100vh';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      accountIdx: this.selectedAccountIdx,
      rerenderAccounts: this.rerenderAccountsFn.bind(this),
      setDefaultAccount: this.setDefaultAccount.bind(this)
    };
    dialogConfig.position = {
      top: '3.75rem',
      right: '0'
    };
    this.dialog.open(AccountInformationsComponent, dialogConfig);
  }
}
