import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentproductdetailComponent } from './paymentproductdetail.component';

describe('PaymentproductdetailComponent', () => {
  let component: PaymentproductdetailComponent;
  let fixture: ComponentFixture<PaymentproductdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentproductdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentproductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
