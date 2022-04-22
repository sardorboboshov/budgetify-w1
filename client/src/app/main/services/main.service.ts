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
      .pipe(map((data: any) => data));
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
}
