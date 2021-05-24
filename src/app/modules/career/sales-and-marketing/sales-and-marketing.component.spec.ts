import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAndMarketingComponent } from './sales-and-marketing.component';

describe('SalesAndMarketingComponent', () => {
  let component: SalesAndMarketingComponent;
  let fixture: ComponentFixture<SalesAndMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAndMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAndMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
