import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from '../../services/main.service';
import { IAccount } from '../../models/account.model';
@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: [
    '../../transactions/transactions-add/transactions-add.component.scss'
  ]
})
export class AccountUpdateComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      account$: Observable<IAccount>;
      accountIdx: number;
      rerenderAccounts: () => void;
    },
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AccountUpdateComponent>,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.data.account$.subscribe((res: any) => {
      this.accountForm.get('title')?.setValue(res.account_name);
      this.accountForm.get('description')?.setValue(res.description);
    });
  }

  accountForm = new FormGroup({
    title: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(128),
      Validators.required
    ]),
    description: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(256)
    ])
  });

  onNoClick() {
    this.dialogRef.close();
  }

  updateAccount() {
    const userId = Number(localStorage.getItem('userId'));
    this.mainService
      .updateAccount(userId, this.data.accountIdx, {
        account_name: this.accountForm.value.title,
        description: this.accountForm.value.description
      })
      .subscribe({
        next: () => {
          this.data.rerenderAccounts();
          this.dialogRef.close();
        },
        error: (err) => {
          this.snackBar.open('Something went wrong, please try again', 'OK', {
            duration: 2000
          });
        },
        complete: () => {
          this.snackBar.open('Account updated successfully', 'OK', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      });
  }
}
