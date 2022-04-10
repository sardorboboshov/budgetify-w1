import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  isSpinnerVisible: boolean = false;
  constructor(public spinnerService: SpinnerService) {}
  ngOnInit() {
    this.subscription = this.spinnerService
      .getIsSpinnerVisible$()
      .subscribe((value: boolean) => {
        this.isSpinnerVisible = value;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
