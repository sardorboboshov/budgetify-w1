import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CategoryComponent } from './category/category.component';

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
    CategoryComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class MainModule {}
