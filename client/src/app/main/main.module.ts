import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { TransactionsInformationsComponent } from './transactions/transactions-informations/transactions-informations.component';
import { TransactionsEditComponent } from './transactions/transactions-edit/transactions-edit.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { ActivityComponent } from './transactions/activity/activity.component';
import { SingleCategoryComponent } from './category/single-category/single-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { TransactionsAddComponent } from './transactions/transactions-add/transactions-add.component';
import { AccountInformationsComponent } from './accounts/accounts-informations/account-informations.component';
import { TransactionDeleteComponent } from './transactions/transaction-delete/transaction-delete.component';
import { AccountAddComponent } from './accounts/account-add/account-add.component';
import { AccountUpdateComponent } from './accounts/account-update/account-update.component';
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { AccountDeleteComponent } from './accounts/account-delete/account-delete.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'categories',
        component: CategoryComponent
      },
      {
        path: '',
        component: MainPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':accountId/:transactionId',
        component: TransactionsInformationsComponent,
        pathMatch: 'full'
      },
      {
        path: ':accountId/:transactionId/edit',
        component: TransactionsEditComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    MainPageComponent,
    AccountsComponent,
    TransactionsComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CategoryComponent,
    TransactionsInformationsComponent,
    TransactionComponent,
    ActivityComponent,
    SingleCategoryComponent,
    TransactionsEditComponent,
    AddCategoryComponent,
    TransactionsAddComponent,
    AccountInformationsComponent,
    TransactionDeleteComponent,
    AccountAddComponent,
    AccountUpdateComponent,
    CategoryDeleteComponent,
    AccountDeleteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule {}
