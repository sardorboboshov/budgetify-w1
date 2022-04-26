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
  @Input() rerenderAccounts!: () => void;
  @Output() transActionsView: EventEmitter<any> = new EventEmitter();
  transActionsData: ITransaction[] = [];
  displayTransactionsData: ITransaction[] = [];

  typeSet: string = '';

  private transactionSubscription!: Subscription;
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
  }

  rerenderTransactions = () => {
    this.ngOnInit();
  };

  getTransActionsData() {
    const user_id = localStorage.getItem('userId');
    this.transactionSubscription = this.mainService
      .getAllTransactionsData(Number(user_id), this.selectedAccountIdx)
      .subscribe((res: any) => {
        this.transActionsData = res.transactions;
        this.displayTransactionsData = res.transactions;
      });
  }
  setTransActionsType = (type: string): void => {
    if (this.typeSet === type) {
      this.typeSet = '';
      this.displayTransactionsData = this.transActionsData;
    } else {
      this.typeSet = type;
      this.displayTransactionsData = this.transActionsData.filter(
        (transaction) => transaction.type === type
      );
    }
  };
}
