import { Component } from '@angular/core';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  selectedAccountIdx: number = 0;
  rerenderAccounts!: () => void;
  setAccountIdx(idx: number) {
    this.selectedAccountIdx = idx;
  }

  rerenderAccountsFn(Fn: () => void) {
    this.rerenderAccounts = Fn;
  }
  constructor() {}
}
