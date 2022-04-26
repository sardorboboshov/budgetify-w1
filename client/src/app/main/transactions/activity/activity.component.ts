import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { ITransaction } from '../../models/transactions-item.model';
import { TransactionsAddComponent } from '../transactions-add/transactions-add.component';
import { AccountAddComponent } from '../../accounts/account-add/account-add.component';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input() setTransActionsType!: (type: string) => void;
  @Input() rerenderTransactions!: () => void;
  @Input() rerenderAccounts!: () => void;
  @Input() accountIdx!: number;
  // @Input() currency!: string;
  constructor(private mainService: MainService, private dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30vw';
    dialogConfig.height = '100vh';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      accountIdx: this.accountIdx,
      rerenderTransactions: () => this.rerenderTransactions(),
      rerenderAccounts: () => this.rerenderAccounts(),
       
    };
    dialogConfig.position = {
      top: '3.75rem',
      right: '0'
    };
    this.dialog.open(TransactionsAddComponent, dialogConfig);
  }

  openAccountDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30vw';
    dialogConfig.height = '100vh';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      accountIdx: this.accountIdx,
      rerenderAccounts: () => this.rerenderAccounts()
    };
    dialogConfig.position = {
      top: '3.75rem',
      right: '0'
    };
    this.dialog.open(AccountAddComponent, dialogConfig);
  }
}
