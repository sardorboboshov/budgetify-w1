import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { ITransaction } from '../models/transactions-item.model';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnChanges {
  @Input() selectedAccountIdx: number = 0;
  transActionsData: ITransaction[] = [];
  currency: string = '';
  typeSet: string = '';
  constructor(private mainService: MainService) {}

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
  getTransActionsData() {
    const user_id = localStorage.getItem('userId');
    this.mainService
      .getAllTransactionsData(Number(user_id), this.selectedAccountIdx)
      .subscribe((res: any) => {
        this.transActionsData = res.transactions;
      });
    this.mainService
      .getAccountData(Number(user_id), this.selectedAccountIdx)
      .subscribe((res: any) => {
        this.currency = res.currency;
      });
  }
  setTransActionsType(type: string) {
    const user_id = localStorage.getItem('userId');
    this.mainService
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
  }
}
