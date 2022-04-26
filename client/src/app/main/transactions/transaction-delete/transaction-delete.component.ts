import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.scss']
})
export class TransactionDeleteComponent {
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TransactionDeleteComponent>,
    private mainService: MainService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      accountId: number;
      transactionId: number;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    const userId = localStorage.getItem('userId');
    this.mainService
      .deleteTransaction(
        Number(userId),
        this.data.accountId,
        this.data.transactionId
      )
      .subscribe({
        next: () => {
          this.router.navigate(['main']);
          this.onNoClick();
        },
        error: (err) => {
          this.snackBar.open('Something went wrong, please try again', 'OK', {
            duration: 2000
          });
        },
        complete: () => {
          this.snackBar.open('Transaction deleted successfully', 'OK', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      });
  }
}
