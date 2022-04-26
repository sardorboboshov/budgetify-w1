import { Component, OnInit, Inject } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MainService } from '../../services/main.service';
import { ICategory } from '../../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-transactions-add',
  templateUrl: './transactions-add.component.html',
  styleUrls: ['./transactions-add.component.scss']
})
export class TransactionsAddComponent implements OnInit {
  categories: ICategory[] = [];
  displayCategories: ICategory[] = [];
  typeSet: string = 'expense';
  currency!: string;
  constructor(
    private snackBar: MatSnackBar,
    private mainService: MainService,
    private dialogRef: MatDialogRef<TransactionsAddComponent>,
    private dateAdapter: DateAdapter<Date>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      accountIdx: number;
      rerenderTransactions: () => void;
      rerenderAccounts: () => void;
      currency: string;
    }
  ) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    this.mainService
      .getAllCategories()
      .subscribe(
        (res: ICategory[]) => (
          (this.categories = res),
          (this.displayCategories = res.filter(
            (category) => category.type === 'expense'
          ))
        )
      );
    this.mainService
      .getAccountCurrency(this.data.accountIdx)
      .subscribe((res: any) => {
        this.currency = res.currency;
      });
  }
  getCurrencySymbol(): string {
    return getCurrencySymbol(this.currency, 'narrow');
  }
  setType(type: string) {
    if (type === this.typeSet) return;
    this.typeSet = type;
    this.transactionForm.get('type')?.setValue(type);
    this.displayCategories = this.categories.filter(
      (category) => category.type === type
    );
  }
  transactionForm = new FormGroup({
    title: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(128),
      Validators.required
    ]),
    type: new FormControl({ value: 'expense', disabled: false }, [
      Validators.required
    ]),
    category: new FormControl({ value: '', disabled: false }, [
      Validators.required
    ]),
    amount: new FormControl({ value: '', disabled: false }, [
      Validators.min(0.1),
      Validators.required,
      Validators.pattern('^([0-9]*[.])?[0-9]*')
    ]),
    createdAt: new FormControl({ value: new Date(), disabled: false }, [
      Validators.required
    ]),
    description: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(256),
      Validators.required
    ])
  });
  today() {
    return new Date();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  formIsInValid() {
    return (
      this.transactionForm.get('title')?.invalid ||
      this.transactionForm.get('amount')?.invalid ||
      this.transactionForm.get('createdAt')?.invalid ||
      this.transactionForm.get('category')?.invalid ||
      this.transactionForm.get('description')?.invalid
    );
  }

  createTransaction() {
    const userId = localStorage.getItem('userId');
    this.mainService
      .createTransaction(Number(userId), this.data.accountIdx, {
        ...this.transactionForm.value,
        amount: Number(this.transactionForm.value.amount)
      })
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.data.rerenderTransactions();
          this.data.rerenderAccounts();
        },
        error: (err) => {
          this.snackBar.open('Something went wrong, please try again', 'OK', {
            duration: 1600
          });
        },
        complete: () => {
          this.snackBar.open('Transaction created successfully', 'OK', {
            duration: 1600,
            verticalPosition: 'top'
          });
        }
      });
  }
}
