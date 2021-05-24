import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenttransactionComponent } from './paymenttransaction.component';

describe('PaymenttransactionComponent', () => {
  let component: PaymenttransactionComponent;
  let fixture: ComponentFixture<PaymenttransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymenttransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenttransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
