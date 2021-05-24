import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentpageComponent } from './paymentpage.component';

describe('PaymentpageComponent', () => {
  let component: PaymentpageComponent;
  let fixture: ComponentFixture<PaymentpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
