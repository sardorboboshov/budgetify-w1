import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITransaction } from '../../models/transactions-item.model';
import { ICategory } from '../../models/category.model';
import { MainService } from '../../services/main.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-transactions-edit',
  templateUrl: './transactions-edit.component.html',
  styleUrls: ['./transactions-edit.component.scss']
})
export class TransactionsEditComponent implements OnInit, OnChanges, OnDestroy {
  accountId!: number;
  transactionId!: number;
  transActionData!: ITransaction;
  transactionSubscription!: Subscription;
  categories$: Observable<ICategory[]> = new Observable<[]>();
  constructor(
    private activeRouter: ActivatedRoute,
    private mainService: MainService,
    private dateAdapter: DateAdapter<Date>,
    private router: Router
  ) {
    this.dateAdapter.setLocale('fr-CH');
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
      Validators.pattern('^[0-9]*')
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transActionData']) {
      this.transactionForm.get('title')?.setValue(this.transActionData.title);
      this.transactionForm
        .get('category')
        ?.setValue(this.transActionData.category);
      this.transactionForm
        .get('date')
        ?.setValue(this.transActionData.createdAt);
      this.transactionForm.get('type')?.setValue(this.transActionData.type);
      this.transactionForm.get('amount')?.setValue(this.transActionData.amount);
      this.transactionForm
        .get('description')
        ?.setValue(this.transActionData.description);
    }
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
      this.transactionForm.get('description')?.invalid
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
      .subscribe(() => {
        this.navigate();
      });
  }
}
