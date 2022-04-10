import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  loginUrl = environment.loginUrl;
  userUrl = environment.userUrl;
  categoriesUrl = environment.categoriesUrl;
  constructor(private http: HttpClient, private router: Router) {}

  getData(id: number) {
    return this.http.get(`${this.userUrl}/${id}`);
  }
  getAllAccountsData(id: number) {
    return this.http.get(`${this.userUrl}/${id}/accounts`);
  }

  getAccountData(id: number, accountId: number) {
    return this.http.get(`${this.userUrl}/${id}/${accountId}`);
  }

  getAllTransactionsData(id: number, accountId: number) {
    return this.http.get(`${this.userUrl}/${id}/${accountId}/transactions`);
  }

  getAllCategories() {
    return this.http.get(this.categoriesUrl);
  }
}
