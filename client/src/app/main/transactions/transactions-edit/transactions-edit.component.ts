import { Component, OnInit, OnDestroy } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITransaction } from '../../models/transactions-item.model';
import { ICategory } from '../../models/category.model';
import { MainService } from '../../services/main.service';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-transactions-edit',
  templateUrl: './transactions-edit.component.html',
  styleUrls: ['./transactions-edit.component.scss']
})
export class TransactionsEditComponent implements OnInit, OnDestroy {
  accountId!: number;
  transactionId!: number;
  transActionData!: ITransaction;
  transactionSubscription!: Subscription;
  categories$: Observable<ICategory[]> = new Observable<[]>();
  constructor(
    private snackBar: MatSnackBar,
    private activeRouter: ActivatedRoute,
    private mainService: MainService,
    private dateAdapter: DateAdapter<Date>,
    private router: Router
  ) {
    this.dateAdapter.setLocale('en-GB');
  }
  getCurrencySymbol(currency: string) {
    return getCurrencySymbol(currency, 'narrow');
  }
  transactionForm = new FormGroup({
    title: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(128),
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
    createdAt: new FormControl({ value: '', disabled: false }, [
      Validators.required
    ]),
    description: new FormControl({ value: '', disabled: false }, [
      Validators.maxLength(256),
      Validators.required
    ])
  });

  ngOnInit(): void {
    this.getTransactionData();
    this.getCategoryData();
  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
  }

  getTransactionData() {
    const userId = localStorage.getItem('userId');
    this.accountId = this.activeRouter.snapshot.params['accountId'];
    this.transactionId = this.activeRouter.snapshot.params['transactionId'];
    this.transactionSubscription = this.mainService
      .getTransactionsDataSub(
        Number(userId),
        this.accountId,
        this.transactionId
      )
      .subscribe((data: any) => {
        this.transActionData = data.transaction;
        this.transactionForm.get('title')?.setValue(data.transaction.title);
        this.transactionForm.get('amount')?.setValue(data.transaction.amount);
        this.transactionForm
          .get('createdAt')
          ?.setValue(new Date(data.transaction.createdAt));
        this.transactionForm
          .get('category')
          ?.setValue(data.transaction.category);
        this.transactionForm
          .get('description')
          ?.setValue(data.transaction.description);
      });
  }

  getCategoryData() {
    this.accountId = this.activeRouter.snapshot.params['accountId'];
    this.transactionId = this.activeRouter.snapshot.params['transactionId'];
    this.categories$ = this.mainService.getAllCategories();
  }

  filteredCategories(categories: ICategory[], type: string) {
    return categories.filter((category) => category.type === type);
  }
  navigate() {
    this.router.navigate(['../'], { relativeTo: this.activeRouter });
  }

  invalid() {
    return (
      this.transactionForm.get('title')?.invalid ||
      this.transactionForm.get('amount')?.invalid ||
      this.transactionForm.get('createdAt')?.invalid ||
      this.transactionForm.get('category')?.invalid ||
      this.transactionForm.get('description')?.invalid ||
      !this.transactionForm.dirty
    );
  }
  updateTransaction() {
    const userId = localStorage.getItem('userId');
    this.accountId = this.activeRouter.snapshot.params['accountId'];
    this.transactionId = this.activeRouter.snapshot.params['transactionId'];
    this.mainService
      .updateTransaction(Number(userId), this.accountId, this.transactionId, {
        title: this.transactionForm.value.title,
        category: this.transactionForm.value.category,
        amount: Number(this.transactionForm.value.amount),
        createdAt: this.transactionForm.value.createdAt,
        description: this.transactionForm.value.description
      })
      .subscribe({
        next: () => {
          this.navigate();
        },
        error: (err) => {
          this.snackBar.open('Something went wrong, please try again', 'OK', {
            duration: 2000
          });
        },
        complete: () => {
          this.snackBar.open('Transaction updated successfully', 'OK', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      });
  }

  today() {
    return new Date();
  }
}
