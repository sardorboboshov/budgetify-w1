import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../../services/main.service';
import { ITransaction } from '../../models/transactions-item.model';
@Component({
  selector: 'app-transactions-informations',
  templateUrl: './transactions-informations.component.html',
  styleUrls: ['./transactions-informations.component.scss']
})
export class TransactionsInformationsComponent implements OnInit {
  accountId!: number;
  transactionId!: number;
  transActionData$: Observable<ITransaction> = new Observable<ITransaction>();

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private mainService: MainService
  ) {}
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.accountId = this.activeRouter.snapshot.params['accountId'];
    this.transactionId = this.activeRouter.snapshot.params['transactionId'];
    this.transActionData$ = this.mainService.getSingleTransactionData(
      Number(userId),
      this.accountId,
      this.transactionId
    );
  }

  navigate() {
    this.router.navigate(['edit']);
  }
}
