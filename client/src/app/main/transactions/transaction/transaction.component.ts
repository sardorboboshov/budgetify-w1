import { Component, Input } from '@angular/core';
import { ITransaction } from '../../models/transactions-item.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  @Input() transaction!: ITransaction;
  @Input() currency!: string;
  constructor() {}
}
