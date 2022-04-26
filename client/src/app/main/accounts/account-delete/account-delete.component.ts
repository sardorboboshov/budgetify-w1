import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: [
    './account-delete.component.scss',
    '../../transactions/transaction-delete/transaction-delete.component.scss'
  ]
})
export class AccountDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      accountIdx: number;
      rerenderAccounts: () => void;
      setDefaultAccount: () => void;
    },
    private dialogRef: MatDialogRef<AccountDeleteComponent>,
    private mainService: MainService,
    private snackBar: MatSnackBar
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAccount() {
    this.mainService.deleteAccount(this.data.accountIdx).subscribe({
      next: () => {
        this.dialogRef.close();
        this.data.setDefaultAccount();
        this.data.rerenderAccounts();
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'OK', {
          duration: 2000
        });
      },
      complete: () => {
        this.snackBar.open('Account deleted successfully', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
// () => {
//       this.dialogRef.close();
//       this.data.setDefaultAccount();
//       this.data.rerenderAccounts();
//     })
