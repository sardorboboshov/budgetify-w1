import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsInformationsComponent } from './transactions-informations.component';

xdescribe('TransactionsInformationsComponent', () => {
  let component: TransactionsInformationsComponent;
  let fixture: ComponentFixture<TransactionsInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
