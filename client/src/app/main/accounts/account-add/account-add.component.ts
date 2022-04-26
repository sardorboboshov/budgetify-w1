import { Component, Inject } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { MainService } from '../../services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: [
    './account-add.component.scss',
    '../../transactions/transactions-add/transactions-add.component.scss'
  ]
})
export class AccountAddComponent {
  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AccountAddComponent>,
    private mainService: MainService,
    @Inject(MAT_DIALOG_DATA)
    public data: { rerenderAccounts: () => void }
  ) {}
  getCurrencySymbol(currency: string): string {
    return getCurrencySymbol(currency, 'narrow');
  }
  accountForm = new FormGroup({
    account_name: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(128),
      Validators.required
    ]),
    currency: new FormControl({ value: 'USD', disabled: false }, [
      Validators.required
    ]),
    description: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(256)
    ])
  });
  onNoClick(): void {
    this.dialogRef.close();
  }
  createAccount() {
    this.mainService.createAccount(this.accountForm.value).subscribe({
      next: () => {
        this.data.rerenderAccounts();
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackBar.open('Something went wrong, please try again', 'OK', {
          duration: 1600
        });
      },
      complete: () => {
        this.snackBar.open('Account created successfully', 'OK', {
          duration: 1600,
          verticalPosition: 'top'
        });
      }
    });
  }
  currencies: string[] = ['USD', 'EUR', 'RUB', 'PLN', 'BYN', 'GBP'];
}
