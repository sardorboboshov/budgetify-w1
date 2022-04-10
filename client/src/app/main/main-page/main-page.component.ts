import { Component } from '@angular/core';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  selectedAccountIdx: number = 0;

  setAccountIdx(idx: number) {
    this.selectedAccountIdx = idx;
  }
  constructor() {}
}
