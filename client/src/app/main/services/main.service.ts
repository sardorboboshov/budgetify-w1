import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, filter } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  loginUrl = environment.loginUrl;
  userUrl = environment.userUrl;
  categoriesUrl = environment.categoriesUrl;

  constructor(private http: HttpClient) {}

  getData(id: number) {
    return this.http.get(`${this.userUrl}/${id}`);
  }
  getAccountName(id: number): Observable<any> {
    return this.http
      .get(`${this.userUrl}/${id}`)
      .pipe(map((data: any) => data.user[0].user_name));
  }
  getAllAccountsData(id: number) {
    return this.http
      .get(`${this.userUrl}/${id}/accounts`)
      .pipe(map((data: any) => data.accounts));
  }

  getAccountData(id: number, accountId: number) {
    return this.http
      .get(`${this.userUrl}/${id}/${accountId}`)
      .pipe(map((data: any) => data.account));
  }

  createAccount(reqBody: Object) {
    const userId = localStorage.getItem('userId');
    return this.http.post(`${this.userUrl}/${userId}`, reqBody);
  }

  updateAccount(id: number, accountId: number, reqBody: Object) {
    return this.http.patch(`${this.userUrl}/${id}/${accountId}`, reqBody);
  }

  deleteAccount(accountId: number) {
    const userId = localStorage.getItem('userId');
    return this.http.delete(`${this.userUrl}/${userId}/${accountId}`);
  }

  getAccountCurrency(accountIdx: number) {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.userUrl}/${userId}/${accountIdx}/currency`);
  }

  isAccountEmpty(id: number, accountId: number) {
    return this.http
      .get(`${this.userUrl}/${id}/${accountId}/transactions`)
      .pipe(map((data: any) => data.transactions));
  }

  getAllTransactionsData(id: number, accountId: number) {
    return this.http.get(`${this.userUrl}/${id}/${accountId}/transactions`);
  }

  getSingleTransactionData(
    id: number,
    accountId: number,
    transactionId: number
  ) {
    return this.http
      .get(`${this.userUrl}/${id}/${accountId}/${transactionId}`)
      .pipe(map((data: any) => data.transaction));
  }

  getTransactionsDataSub(id: number, accountId: number, transactionId: number) {
    return this.http.get(`${this.userUrl}/${id}/${accountId}/${transactionId}`);
  }

  updateTransaction(
    id: number,
    accountId: number,
    transactionId: number,
    reqBody: object
  ) {
    return this.http.patch(
      `${this.userUrl}/${id}/${accountId}/${transactionId}`,
      reqBody
    );
  }

  createTransaction(id: number, accountId: number, reqBody: Object) {
    return this.http.post(`${this.userUrl}/${id}/${accountId}`, reqBody);
  }

  deleteTransaction(id: number, accountId: number, transactionId: number) {
    return this.http.delete(
      `${this.userUrl}/${id}/${accountId}/${transactionId}`
    );
  }

  getAllCategories() {
    return this.http
      .get(this.categoriesUrl)
      .pipe(map((data: any) => data.categories));
  }
  getAllCategoriesSub() {
    return this.http.get(this.categoriesUrl);
  }
  updateCategory(categoryId: string, reqBody: Object) {
    return this.http.patch(`${this.categoriesUrl}/${categoryId}`, reqBody);
  }
  deleteCategory(categoryId: string) {
    return this.http.delete(`${this.categoriesUrl}/${categoryId}`);
  }

  createCategory(reqBody: Object) {
    return this.http.post(this.categoriesUrl, reqBody);
  }
}
