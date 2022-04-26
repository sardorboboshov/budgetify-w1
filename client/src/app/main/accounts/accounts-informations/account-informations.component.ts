import { Component, Inject, OnInit } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MainService } from '../../services/main.service';
import { IAccount } from '../../models/account.model';
import { AccountUpdateComponent } from '../account-update/account-update.component';
import { AccountDeleteComponent } from '../account-delete/account-delete.component';
@Component({
  selector: 'app-account-informations',
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.scss']
})
export class AccountInformationsComponent implements OnInit {
  account!: IAccount;
  getCurrencySymbol(currency: string): string {
    return getCurrencySymbol(currency, 'narrow');
  }
  account$: Observable<IAccount> = new Observable<IAccount>();
  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      accountIdx: number;
      rerenderAccounts: () => void;
      setSelectedAccount: (accountIdx: number) => void;
      setDefaultAccount: () => void;
    },
    private dialogRef: MatDialogRef<AccountInformationsComponent>
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.account$ = this.mainService.getAccountData(
      Number(userId),
      this.data.accountIdx
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35vw';
    dialogConfig.height = '100vh';
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '3.75rem',
      right: '0'
    };
    dialogConfig.data = {
      account$: this.account$,
      accountIdx: this.data.accountIdx,
      rerenderAccounts: this.data.rerenderAccounts
    };
    this.dialog.open(AccountUpdateComponent, dialogConfig);
  }

  openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      accountIdx: this.data.accountIdx,
      rerenderAccounts: this.data.rerenderAccounts,
      setDefaultAccount: this.data.setDefaultAccount
    };
    this.dialog.open(AccountDeleteComponent, dialogConfig);
  }
}
