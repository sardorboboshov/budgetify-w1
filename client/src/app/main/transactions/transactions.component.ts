import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITransaction } from '../models/transactions-item.model';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedAccountIdx: number = 0;
  @Output() transActionsView: EventEmitter<any> = new EventEmitter();
  transActionsData: ITransaction[] = [];
  currency: string = '';
  typeSet: string = '';

  private transactionSubscription!: Subscription;
  private accountSubscription!: Subscription;
  constructor(private mainService: MainService, private router: Router) {}
  navigate(index: number) {
    this.router.navigate(['/main', this.selectedAccountIdx, index]);
  }
  ngOnInit(): void {
    this.getTransActionsData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['selectedAccountIdx'].currentValue !==
      changes['selectedAccountIdx'].previousValue
    ) {
      this.getTransActionsData();
    }
  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
  }

  getTransActionsData() {
    const user_id = localStorage.getItem('userId');
    this.transactionSubscription = this.mainService
      .getAllTransactionsData(Number(user_id), this.selectedAccountIdx)
      .subscribe((res: any) => {
        this.transActionsData = res.transactions;
      });
    this.accountSubscription = this.mainService
      .getAccountData(Number(user_id), this.selectedAccountIdx)
      .subscribe((res: any) => {
        this.currency = res.currency;
      });
  }
  setTransActionsType = (type: string): void => {
    const user_id = localStorage.getItem('userId');
    this.transactionSubscription = this.mainService
      .getAllTransactionsData(Number(user_id), this.selectedAccountIdx)
      .subscribe((res: any) => {
        if (this.typeSet === type) {
          this.transActionsData = res.transactions;
          this.typeSet = '';
        } else {
          this.transActionsData = res.transactions.filter(
            (transaction: any) => transaction.type === type
          );
          this.typeSet = type;
        }
      });
  };
}
